const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto"); // Correct way to import crypto module
require("dotenv").config();
const pkg = require("pg"); // Import pg using require
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { Pool, Client } = pkg; // Destructure Pool and Client
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinaryModule = require("cloudinary");

const cloudinary = cloudinaryModule.v2;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Cloudinary Config
cloudinary.config({
  cloud_name: "dvj4mroel",
  api_key: "574978959734848",
  api_secret: "C_jILnTXsUPdPj8pKQdROd8uQys",
});


app.use(
  cors({
    origin: "https://davao-oriental-bioexplorer-client.vercel.app", // Allow requests from this origin
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies, if needed
  })
);



const pool = new Pool({
  connectionString: "postgresql://reposatory:71YyyVsRMV2544ho7UjtQcGw3UcHXUSg@dpg-cvemttd2ng1s73ci1oag-a.oregon-postgres.render.com/reposatory",
  ssl: { rejectUnauthorized: false }, // Required for cloud databases like Render
});

// Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "species-images",
    format: async (req, file) => "jpg", // or "png"
    public_id: (req, file) => Date.now(),
  },
});

const upload = multer({ storage });


// Database Keep-Alive - Make sure the database connection remains active
setInterval(() => {
  pool.query("SELECT 1", (err, results) => {
    if (err) {
      console.error("Database Keep-Alive error:", err);
    } else {
      console.log("✅ Database is alive");
    }
  });
}, 5 * 60 * 1000); // Keeps the connection alive every 5 minutes

// Function to check for informal content
function isFormalMessage(message) {
  // Regular expressions to identify informal patterns
  const informalPatterns = [
    /[qwertyuiopasdfghjklzxcvbnm]/i, // Common keyboard patterns
    /\d+/g, // Any digits
    /[!@#$%^&*(),.?":{}|<>]/g,
    /(.)\1{2,}/i,
    /\b(?:ew|ugh|omg|lol|lmao|brb|gtg|smh|bff|idk|fyi)\b/i,
    // Check for long strings without spaces
    /^([a-zA-Z0-9]{10,})$/, // Matches alphanumeric strings longer than 10
  ];

  for (let pattern of informalPatterns) {
    if (pattern.test(message)) {
      return false; // Informal message detected
    }
  }
  return true; // Formal message
}

console.log(process.env.DB_HOST);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);
console.log(process.env.DB_PORT);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "We need a token, please provide it." });
  }

  jwt.verify(token,  process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    // Store decoded user details in req.user object
    req.user = {
      id: decoded.id,
      firstname: decoded.firstname,
      middlename: decoded.middlename,
      lastname: decoded.lastname,
      address: decoded.address,
      email: decoded.email,
      gender: decoded.gender,
      image: decoded.image,
      address: decoded.address,
      currentPassword: decoded.currentPassword,
      newPassword: decoded.newPassword,
      confirmPassword: decoded.confirmPassword,
      rating: decoded.rating,
      message: decoded.message,
      score: decoded.score,
    };

    next();
  });
};

app.get("/", verifyUser, (req, res) => {
  return res.json({
    message: "Profile retrieved successfully",
    user: {
      id: req.user.id,
      firstname: req.user.firstname,
      middlename: req.user.middlename,
      lastname: req.user.lastname,
      address: req.user.address,
      email: req.user.email,
      image: req.user.image,
      gender: req.user.gender,
      currentPassword: req.user.currentPassword,
      newPassword: req.user.newPassword,
      confirmPassword: req.user.confirmPassword,
      rating: req.user.rating,
      message: req.user.message,
    },
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  const sql = "SELECT * FROM user1 WHERE email = $1"; // PostgreSQL query syntax

  pool.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Message: err.message });
    }
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const hashedPassword = user.password;

      // Compare passwords
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          console.error("Password comparison error:", err);
          return res.status(500).json({ Message: "Error comparing passwords" });
        }
        if (isMatch) {
          const token = jwt.sign(
            {
              id: user.id,
              firstname: user.firstname,
              middlename: user.middlename,
              lastname: user.lastname,
              email: user.email,
              image: user.image,
              gender: user.gender,
              address: user.address,
              currentPassword: user.currentPassword,
              newPassword: user.newPassword,
              confirmPassword: user.confirmPassword,
              rating: user.rating,
              message: user.message,
              score: user.score
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
          );

          // Set the JWT token in a cookie
          res.cookie("token", token, {
            httpOnly: true,
            secure: true, // must be true in production (HTTPS)
            sameSite: "None", // allows cross-site cookies
          });
          
          return res.json({
            Status: "Success",
            firstname: user.firstname,
            middlename: user.middlename,
            lastname: user.lastname,
            email: user.email,
            image: user.image,
            gender: user.gender,
            address: user.address,
            currentPassword: user.currentPassword,
            newPassword: user.newPassword,
            confirmPassword: user.confirmPassword,
            rating: user.rating,
            message: user.message,
            score: user.score
          });
        } else {
          return res.status(401).json({ Message: "Incorrect Password" });
        }
      });
    } else {
      return res.status(404).json({ Message: "No Records Existed" });
    }
  });
});


app.post("/api/register", async (req, res) => {
  const { firstname, middlename, lastname, email, password, address, gender } =
    req.body;
  // Basic validation
  if (
    !firstname ||
    !middlename ||
    !lastname ||
    !email ||
    !password ||
    !address ||
    !gender
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into PostgreSQL database
    const query =
      "INSERT INTO user1 (firstname, middlename, lastname, email, password, address, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
    
    const values = [firstname, middlename, lastname, email, hashedPassword, address, gender];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.rows[0].id, // Assuming 'id' is the column name for the primary key
    });
  } catch (error) {
    console.error(error); // Log any unexpected errors
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/gotoregister", (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });

  // Optionally, send a success message
  res.json({ message: "Logout successful" });
});

app.post("/gotoforgot", async (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });

  // Optionally, send a success message
  res.json({ message: "Logout successful" });
});

// API endpoint to fetch images
app.get("/api/images", async (req, res) => {
  const sql = "SELECT * FROM species"; // Query to fetch species data
  
  try {
    // Query the database using the pool
    const result = await pool.query(sql);
    
    // Cloudinary base URL
    const cloudinaryBaseURL = "https://res.cloudinary.com/dvj4mroel/image/upload/v1742857519/species-images/";

    // Modify the result to include full image URLs
    const modifiedResult = result.rows.map(species => ({
      ...species,
      image_url: `${cloudinaryBaseURL}${species.image_filename}` // Construct full Cloudinary URL
    }));

    res.json(modifiedResult); // Return the modified result with image URLs
  } catch (err) {
    console.error("Error fetching images:", err);
    return res.status(500).json({ error: "Failed to fetch images" });
  }
});

// Cloudinary base URL
const cloudinaryBaseURL = "https://res.cloudinary.com/dvj4mroel/image/upload/v1742857519/species-images/";

// Endpoint to fetch species data including image URLs
app.get("/api/species", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }

  const query = `
    SELECT specificname, commonname, scientificname, location, speciescategory, uploadimage, latitude, longitude
    FROM species 
    WHERE (specificname LIKE $1 OR commonname LIKE $1 OR scientificname LIKE $1 OR speciescategory LIKE $1)
  `;
  
  const searchPattern = `%${name}%`; // Flexible search pattern

  pool.query(query, [searchPattern], async (error, result) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No matching species found" });
    }

    try {
      // Modify result to include full Cloudinary URL
      const modifiedResults = result.rows.map((species) => {
        const imageUrl = species.uploadimage
          ? `${cloudinaryBaseURL}${species.uploadimage}`
          : null; // Construct full Cloudinary URL or null if no image
        return {
          ...species,
          image_url: imageUrl, // Add image_url to each species
        };
      });

      res.json(modifiedResults);
    } catch (err) {
      console.error("Error processing species data:", err);
      res.status(500).json({ error: "Error processing species data" });
    }
  });
});

app.get("/speciesCounts", async (req, res) => {
  const queries = [
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'mammals'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'fish'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'birds'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'reptiles'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'amphibians'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'insects'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'arachnids'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'mollusks'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'echinoderms'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'cnidarians'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'worms'",
    "SELECT COUNT(*) AS count FROM species WHERE speciescategory = 'sponges'",
  ];

  try {
    const results = await Promise.all(queries.map((query) => pool.query(query)));
    
    res.json({
      mammals: results[0].rows[0].count,
      fish: results[1].rows[0].count,
      birds: results[2].rows[0].count,
      reptiles: results[3].rows[0].count,
      amphibians: results[4].rows[0].count,
      insects: results[5].rows[0].count,
      arachnids: results[6].rows[0].count,
      mollusks: results[7].rows[0].count,
      echinoderms: results[8].rows[0].count,
      cnidarians: results[9].rows[0].count,
      worms: results[10].rows[0].count,
      sponges: results[11].rows[0].count,
    });
  } catch (err) {
    console.error("Error fetching species counts:", err);
    res.status(500).json({ error: "Failed to fetch species counts" });
  }
});

app.get("/api/conservation-status-count", async (req, res) => {
  const conservationStatuses = [
    "critically-endangered",
    "endangered",
    "vulnerable",
    "near-threatened",
    "least-concern",
  ];

  try {
    const results = await Promise.all(
      conservationStatuses.map(async (status) => {
        const result = await pool.query(
          `SELECT COUNT(*) AS count FROM species WHERE conservationstatus = $1`,
          [status]
        );
        return { status, count: parseInt(result.rows[0].count, 10) };
      })
    );

    // Get total count for calculating percentages
    const totalCount = results.reduce((acc, item) => acc + item.count, 0);

    // Convert array into an object for easier use in frontend, adding percentage
    const formattedData = results.reduce((acc, item) => {
      const percentage = ((item.count / totalCount) * 100).toFixed(2);
      acc[item.status] = { count: item.count, percentage };
      return acc;
    }, {});

    res.json(formattedData);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Database error", error: err });
  }
});
// Define the storage configuration
const profileStorages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile"); // change path if needed
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

app.post("/logout", (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });

  // Optionally, send a success message
  res.json({ message: "Logout successful" });
});

const profileUpload = multer({ storage: profileStorages });

app.put("/profile", verifyUser, profileUpload.single("image"), (req, res) => {
  const userId = req.user.id;
  const { firstname, middlename, lastname, email, gender, address } = req.body;
  const image = req.file ? req.file.filename : null;

  const selectSql = `
    SELECT firstname, middlename, lastname, email, gender, address, image 
    FROM user1 
    WHERE id = $1
  `;

  pool.query(selectSql, [userId], (selectErr, selectResult) => {
    if (selectErr) {
      console.error("Error fetching current profile:", selectErr);
      return res.status(500).json({ message: "Error fetching current profile" });
    }

    if (selectResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentUser = selectResult.rows[0];

    const updatedFirstname = firstname || currentUser.firstname;
    const updatedMiddlename = middlename || currentUser.middlename;
    const updatedLastname = lastname || currentUser.lastname;
    const updatedEmail = email || currentUser.email;
    const updatedGender = gender || currentUser.gender;
    const updatedAddress = address || currentUser.address;
    const imageToUpdate = image || currentUser.image;

    const updateSql = `
      UPDATE user1 SET 
        firstname = $1,
        middlename = $2,
        lastname = $3,
        email = $4,
        gender = $5,
        address = $6,
        image = $7
      WHERE id = $8
    `;

    pool.query(
      updateSql,
      [
        updatedFirstname,
        updatedMiddlename,
        updatedLastname,
        updatedEmail,
        updatedGender,
        updatedAddress,
        imageToUpdate,
        userId,
      ],
      (updateErr) => {
        if (updateErr) {
          console.error("Error updating profile:", updateErr);
          return res.status(500).json({ message: "Error updating profile" });
        }
        res.json({ message: "Profile updated successfully" });
      }
    );
  });
});

app.post("/password-changes", verifyUser, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "New passwords do not match" });
  }

  try {
    // PostgreSQL SELECT query
    pool.query(
      "SELECT password FROM user1 WHERE id = $1",
      [req.user.id],
      async (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (result.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        const hashedPassword = result.rows[0].password;

        const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
        if (!isMatch) {
          return res
            .status(401)
            .json({ error: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // PostgreSQL UPDATE query
        pool.query(
          "UPDATE user1 SET password = $1 WHERE id = $2",
          [hashedNewPassword, req.user.id],
          (err) => {
            if (err) {
              console.error("Error updating password:", err);
              return res.status(500).json({ error: "Error updating password" });
            }
            res.status(200).json({ message: "Password changed successfully" });
          }
        );
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/submit-feedback", verifyUser, (req, res) => {
  const { rating, message } = req.body;
  const { firstname, lastname } = req.user; // Use user's name from token

  if (!rating || !message) {
    return res.status(400).send("Rating and message are required.");
  }

  // Insert feedback into the database using PostgreSQL syntax
  const sql = `INSERT INTO feedback (rating, message, firstname, lastname) VALUES ($1, $2, $3, $4)`;
  pool.query(sql, [rating, message, firstname, lastname], (err, result) => {
    if (err) return res.status(500).send("Database error");
    res.status(200).send("Feedback submitted successfully");
  });
});

// In-memory storage for OTPs
const otpStore = {};

// Function to send email using Nodemailer
const sendOTPEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "davorbioexplorer@gmail.com", // Your Gmail address
      pass: "axln xjew aeoc rfbt", // Your Gmail password or app password
    },
  });

  const mailOptions = {
    from: '"Dav-OR BioExplorer" <davorbioexplorer@gmail.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

// Generate a 6-digit OTP code
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // Generates a number between 100000 and 999999
};

// Endpoint to handle OTP email sending
app.post("/send-otp", (req, res) => {
  const { email } = req.body;

  // Generate an OTP and store it in memory
  const otp = generateOTP();
  otpStore[email] = otp; // Store OTP for the email

  sendOTPEmail(email, otp)
    .then(() => {
      res.status(200).send("OTP sent to your email");
    })
    .catch((error) => {
      console.error("Error sending email:", error); // Log the error
      res.status(500).send("Error sending email");
    });
});

// Endpoint to verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  // Check if the email exists in the OTP store
  if (!otpStore[email]) {
    return res
      .status(400)
      .json({ success: false, message: "No OTP found for this email." });
  }

  // Check if the OTP matches
  if (otpStore[email] === otp) {
    // OTP verified successfully
    delete otpStore[email]; // Remove OTP from store after successful verification
    return res.json({ success: true, message: "OTP verified successfully!" });
  } else {
    // Invalid OTP
    return res
      .status(400)
      .json({ success: false, message: "Invalid OTP. Please try again." });
  }
});

app.post("/reset-password", (req, res) => {
  const { email, password } = req.body;

  console.log("Received request to reset password for:", email); // Log the incoming email

  pool.query("SELECT * FROM user1 WHERE email = $1", [email], (err, result) => {
    if (err) {
      console.error("Error querying database:", err); // Log database query error
      return res.status(500).send("Server error");
    }

    if (result.rows.length > 0) {
      console.log("User found, proceeding to hash password.");

      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error("Error hashing password:", hashErr); // Log hashing error
          return res.status(500).send("Error hashing password");
        }

        pool.query(
          "UPDATE user1 SET password = $1 WHERE email = $2",
          [hashedPassword, email],
          (updateErr) => {
            if (updateErr) {
              console.error("Error updating password:", updateErr); // Log update error
              return res.status(500).send("Error updating password");
            }

            console.log("Password reset successfully.");
            res.json({
              success: true,
              message: "Password reset successfully!",
            });
          }
        );
      });
    } else {
      console.log("User not found.");
      res.status(404).json({ success: false, message: "Email not registered" });
    }
  });
});

// Endpoint to get quiz questions
app.get('/api/multiple-choice', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM questions');
    const formatted = result.rows.map((q) => ({
      id: q.id,
      question: q.question,
      options: [q.optiona, q.optionb, q.optionc, q.optiond],
      correctAnswer: q.correctanswer
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// POST: Save quiz score for logged-in user
app.post('/api/submit-score', (req, res) => {
  console.log("Received score submission:", req.body);
  
  const { firstname, lastname, score } = req.body;

  if (!firstname || !lastname || score === undefined) {
    return res.status(400).json({ error: 'Missing required fields (firstname, lastname, or score)' });
  }

  // Directly insert without looking up user — since you're passing firstname/lastname
  const insertQuery = 'INSERT INTO quizzes (firstname, lastname, score) VALUES ($1, $2, $3)';
  
  pool.query(insertQuery, [firstname, lastname, score], (err) => {
    if (err) {
      console.error('Error saving score:', err);
      return res.status(500).json({ error: 'Failed to save score' });
    }
    res.json({ message: 'Score saved successfully!' });
  });
});

// Route to fetch matching questions
app.get("/api/matching_type_question", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, item_a, item_b FROM matching_questions");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST: Save quiz score for logged-in user
app.post('/api/matching-submit-score', (req, res) => {
  console.log("Received score submission:", req.body);
  
  const { firstname, lastname, score } = req.body;

  if (!firstname || !lastname || score === undefined) {
    return res.status(400).json({ error: 'Missing required fields (firstname, lastname, or score)' });
  }

  // Directly insert without looking up user — since you're passing firstname/lastname
  const insertQuery = 'INSERT INTO matching_type_questions (firstname, lastname, score) VALUES ($1, $2, $3)';
  
  pool.query(insertQuery, [firstname, lastname, score], (err) => {
    if (err) {
      console.error('Error saving score:', err);
      return res.status(500).json({ error: 'Failed to save score' });
    }
    res.json({ message: 'Score saved successfully!' });
  });
});

// Route to fetch quiz questions
app.get('/api/identification_question', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, statement, answer FROM identification_questions');
    const questions = result.rows;
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
});


// POST: Save quiz score for logged-in user
app.post('/api/submit-quiz', (req, res) => {
  console.log("Received score submission:", req.body);
  
  // Destructure the body data with matching variable names
  const { firstname, lastname, score } = req.body;

  // Check if required fields are present
  if (!firstname || !lastname || score === undefined) {
    return res.status(400).json({ error: 'Missing required fields (firstname, lastname, or score)' });
  }

  // Directly insert the data into the database
  const insertQuery = 'INSERT INTO quiz_results (firstname, lastname, score) VALUES ($1, $2, $3)';
  
  pool.query(insertQuery, [firstname, lastname, score], (err) => {
    if (err) {
      console.error('Error saving score:', err);
      return res.status(500).json({ error: 'Failed to save score' });
    }
    res.json({ message: 'Score saved successfully!' });
  });
});

app.get('/api/userinfo', verifyUser, async (req, res) => {
  const userId = req.user.id;

  try {
    // Kunin firstname at lastname mula sa users table
    const userResult = await pool.query('SELECT firstname, lastname FROM users WHERE id = $1', [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userInfo = userResult.rows[0];

    // Kunin score mula sa quizzes table
    const scoreResult = await pool.query('SELECT score FROM quizzes WHERE id = $1', [userId]); // assuming may `user_id` column sa quizzes

    const scoreInfo = scoreResult.rows[0] || { score: null }; // kung walang score, null nalang

    // Icombine mo sila
    res.json({
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      score: scoreInfo.score,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error', error });
  }
});




// Start the server on port 8081
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
