export async function registerController(req, res) {
  try {
    if (!req.body) throw new Error("No Body Found");

    const { email, username, password, bio, profileImage } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserAlreadyExists)
      return res.status(409).json({
        message: isUserAlreadyExists.email
          ? "Email Aready Exists"
          : "Username is already Taken",
      });

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
      username,
      email,
      bio,
      profileImage,
      password: hash,
    });

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "Error Registering User",
      error: error.message,
    });
  }
}

export async function loginController(req, res) {
  try {
    if (!req.body) {
      return res.status(404).json({
        message: "No body found!",
      });
    }

    if (!(req.body.email || (req.body.password && req.body.password))) {
      return res.status(404).json({
        message: "Field is missing!",
      });
    }

    const user = await userModel.findOne({
      $or: [
        {
          username: req.body.username,
        },
        {
          email: req.body.email,
        },
      ],
    });

    if (!user)
      return res.status(404).json({ message: "Invalid email or username" });

    const hash = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");

    if (hash !== user.password)
      return res.status(409).json({
        message: "Invalid Password",
      });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("auth_token", token);
    res.status(200).json({
      message: "User Logged In",
      user: {
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Some error occurred..",
      error,
    });
  }
}
