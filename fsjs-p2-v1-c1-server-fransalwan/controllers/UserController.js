const { comparePassword } = require("../helpers/bcrypt");
const { User, Customer } = require("../models");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      // console.log(email, password);

      const created = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });

      // console.log(created, "<<<<<<<<<");

      res.status(201).json({
        id: created.id,
        email: created.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async custRegister(req, res, next) {
    try {
      console.log("masuk sini");
      const { username, email, password } = req.body;

      console.log(username, email, password);

      const created = await Customer.create({
        username,
        email,
        password,
        role: "customer",
      });

      // console.log(created, "<<<<<<<<<");

      res.status(201).json({
        id: created.id,
        email: created.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      console.log("masuk sini");
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "LoginError" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      console.log(user, "<<<<<<<<<<<<<<<<<<<<< ini user");

      if (!user) {
        throw { name: "LoginError" };
      }

      if (!comparePassword(password, user.password)) {
        throw { name: "LoginError" };
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = signToken(payload);

      res.status(200).json({
        username: user.username,
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async custLogin(req, res, next) {
    try {
      // console.log("masuk sini bang login");
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "LoginError" };
      }

      const customer = await Customer.findOne({
        where: {
          email,
        },
      });

      // console.log(customer, "<<<< ini customernya");

      if (!customer) {
        throw { name: "LoginError" };
      }

      if (!comparePassword(password, customer.password)) {
        throw { name: "LoginError" };
      }

      const payload = {
        id: customer.id,
        username: customer.username,
        email: customer.email,
        role: customer.role,
      };

      // console.log("payload nya <<");

      const token = signToken(payload);

      // console.log(token);

      res.status(200).json({
        username: customer.username,
        isSubscribed: customer.isSubscribed,
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async OAuthLogin(req, res, next) {
    try {
      // console.log(req.headers.google_token, "<<<<<<<<<<");

      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      // console.log(ticket, "<<<<<<<<<<<");

      const payload = ticket.getPayload();
      // console.log(payload,  "<<<<<<< payload");

      console.log("dibawah harunya ada user <<<<<<<");
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.username,
          role: "Staff",
          password: "google oauth",
        },
        hooks: false, // agar tidak dihash
      });

      console.log(user.dataValues.username, "<<<<< ini user google");

      const access_token = signToken({
        id: user.id,
        email: user.email,
      });
      // console.log(access_token, "acces token bos");
      res.status(200).json({
        username: user.dataValues.username,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async custOAuthLogin(req, res, next) {
    try {
      // console.log(req.headers.google_token, "<<<<<<<<<<");

      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      // console.log(ticket, "<<<<<<<<<<<");

      const payload = ticket.getPayload();
      // console.log(payload, "<<<<<<< payload");

      // console.log("dibawah harunya ada user <<<<<<<");
      const [customer, isCreated] = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          role: "customer",
          password: "google oauth",
        },
        hooks: false, // agar tidak dihash
      });

      // console.log(customer.dataValues.username, "<<<<< ini customer google");

      const access_token = signToken({
        id: customer.id,
        email: customer.email,
      });
      // console.log(access_token, "acces token bos");
      // console.log(customer.username, "<<< ini customer");
      res.status(200).json({
        username: customer.username,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
