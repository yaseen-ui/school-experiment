import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";
import { Sequelize } from "sequelize";
import { generateOTP } from "../../utils/otpUtils.js";
import { sendSMS } from "../../utils/smsService.js";

class UserService {
  static async createUser(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      return await User.create({ ...data, password: hashedPassword });
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        const field = error.errors[0].path; // e.g., 'email'
        const message = `A user with this ${field} already exists.`;
        throw new Error(message); // Throw a more user-friendly error
      }
      throw error;
    }
  }

  static async getAllUsers(tenant_id) {
    try {
      let users;
      if (!tenant_id) {
        users = await User.findAll();
      } else {
        users = await User.findAll({
          where: { tenant_id },
        });
      }
      return users;
    } catch (error) {
      throw new Error(
        `Failed to fetch users for tenant ID ${tenant_id}: ${error.message}`
      );
    }
  }

  static async getUserById(userId, tenant_id) {
    return await User.findByPk(userId, { where: { tenant_id } });
  }

  static async updateUser(userId, data) {
    return await User.update(data, { where: { user_id: userId } });
  }

  static async deleteUser(userId) {
    return await User.destroy({ where: { user_id: userId } });
  }

  static async createCompanyUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await User.create({
      ...data,
      user_type: "company",
      password: hashedPassword,
      tenant_id: null,
    });
  }

  static async getAllCompanyUsers() {
    return await User.findAll({ where: { user_type: "company" } });
  }

  static async updatePassword(user_id, oldPassword, newPassword) {
    // Fetch the user with primary key and password explicitly included
    const user = await User.findByPk(user_id, {
      attributes: ["user_id", "password"], // Include both primary key and password
    });

    if (!user) {
      throw new Error("User not found.");
    }

    // Compare the old password with the stored password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect.");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await user.update({ password: hashedPassword });

    return { message: "Password updated successfully." };
  }

  static async forgetPassword(email) {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found.");
    }

    // Generate an OTP
    const otp = generateOTP();

    // Save the OTP in the database (e.g., add a column for OTP in the User table or store it in a cache)
    await user.update({ otp });

    // Send OTP via SMS
    const message = `Your OTP for resetting your password is ${otp}. It is valid for 10 minutes.`;
    await sendSMS(user.phone, message);

    return { message: "OTP sent to your registered phone number." };
  }

  static async resetPasswordWithOTP(email, otp, newPassword) {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found.");
    }

    // Verify OTP
    if (user.otp !== otp) {
      throw new Error("Invalid OTP.");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password and clear the OTP
    await user.update({ password: hashedPassword, otp: null });

    return { message: "Password reset successfully." };
  }
}

export default UserService;
