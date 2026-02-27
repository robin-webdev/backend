import { followModel } from "../models/follow.model.js";
import { userModel } from "../models/user.model.js";

export async function followController(req, res) {
  const followeeUsername = req.params.username;

  let followee;
  try {
    followee = await userModel.findOne({
      username: followeeUsername,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred",
    });
    console.error("Error Finding followee", error);
    return;
  }

  if (!followee) {
    return res.status(404).json({
      message: "User you want to follow does not exists",
    });
  }

  if (followeeUsername === req.user.username) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    followee: followeeUsername,
    follower: req.user.username,
  });

  if (isAlreadyFollowing) {
    return res.status(409).json({
      message: "You are already following @" + followeeUsername,
    });
  }

  try {
    await followModel.create({
      follower: req.user.username,
      followee: followeeUsername,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error following @" + followeeUsername,
      error,
    });
    console.error(error);
    return;
  }
  res.status(201).json({
    message: "You are now following @" + followeeUsername,
  });
}

export async function unfollowController(req, res) {
  const followeeUsername = req.params.username;

  let followee;
  try {
    followee = await userModel.findOne({
      username: followeeUsername,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred",
    });
    console.error("Error Finding followee", error);
    return;
  }

  if (!followee) {
    return res.status(404).json({
      message: "User you want to follow does not exists",
    });
  }

  if (followeeUsername === req.user.username) {
    return res.status(409).json({
      message: "You cannot unfollow yourself",
    });
  }

  const isFollowing = await followModel.findOne({
    followee: followeeUsername,
    follower: req.user.username,
  });

  if (!isFollowing) {
    return res.status(400).json({
      message: "You are already not following @" + followeeUsername,
    });
  }

  try {
    await followModel.findByIdAndDelete(isFollowing._id);
  } catch (error) {
    res.status(500).json({
      message: "Error unfollowing @" + followeeUsername,
      error,
    });
    console.error(error);
    return;
  }
  res.status(200).json({
    message: "You have unfollowed @" + followeeUsername,
  });
}
