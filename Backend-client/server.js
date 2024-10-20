const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000", // Change this to your frontend URL
    credentials: true,
}));



// MySQL connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reposatory01"
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

 // Function to check for informal content
 function isFormalMessage(message) {
    // Regular expressions to identify informal patterns
    const informalPatterns = [
      /[qwertyuiopasdfghjklzxcvbnm]/i, // Common keyboard patterns
      /\d+/g, // Any digits
      /[!@#$%^&*(),.?":{}|<>]/g, // Special characters
      // Checks for sequences of 3 or more repeated characters
      /(.)\1{2,}/i, 
      // Check for common informal phrases or text-speak
      /\b(?:ew|ugh|omg|lol|lmao|brb|gtg|smh|bff|idk|fyi)\b/i,
      // Check for long strings without spaces
      /^([a-zA-Z0-9]{10,})$/ // Matches alphanumeric strings longer than 10
    ];
  
    for (let pattern of informalPatterns) {
      if (pattern.test(message)) {
        return false; // Informal message detected
      }
    }
    return true; // Formal message
  }
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "We need a token, please provide it." });
    }

    jwt.verify(token, "secret-key", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        // Store decoded user details in req.user object
        req.user = {
            id:decoded.id,
            firstname: decoded.firstname,
            middlename: decoded.middlename,
            lastname: decoded.lastname,
            address: decoded.address,
            email: decoded.email,
            gender: decoded.gender,
            image: decoded.image,
            address: decoded.address,
            currentPassword:decoded.currentPassword, 
            newPassword:decoded.newPassword, 
            confirmPassword: decoded.confirmPassword,
            rating: decoded.rating,
            message: decoded.message,
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
            currentPassword:req.user.currentPassword, 
            newPassword:req.user.newPassword, 
            confirmPassword: req.user.confirmPassword,
            rating: req.user.rating,
            message: req.user.message
        }
    });
});

app.use('/images', express.static(path.join(__dirname, 'images')));
const profileStorages = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./images")
    },
    filename: function (req, file, cb){
        return cb(null, Date.now() + path.extname(file.originalname));
    }
});
const profileUpload = multer({ storage: profileStorages });


app.put('/profile', verifyUser, profileUpload.single('image'), (req, res) => {
    const userId = req.user.id; // Get the user ID from the request
    const { firstname, middlename, lastname, email, gender, address } = req.body;
    const image = req.file ? req.file.filename : null; // Get the new image filename if uploaded

    // SQL query to select the current user data
    const selectSql = `SELECT firstname, middlename, lastname, email, gender, address, image FROM user1 WHERE id = ?`;
    db.query(selectSql, [userId], (selectErr, selectResults) => {
        if (selectErr) {
            console.error("Error fetching current profile:", selectErr);
            return res.status(500).json({ message: 'Error fetching current profile' });
        }

        if (selectResults.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentUser = selectResults[0];

        // Prepare updated data, keeping existing values for fields that are not provided
        const updatedFirstname = firstname || currentUser.firstname;
        const updatedMiddlename = middlename || currentUser.middlename;
        const updatedLastname = lastname || currentUser.lastname;
        const updatedEmail = email || currentUser.email;
        const updatedGender = gender || currentUser.gender; // Keep current gender if not provided
        const updatedAddress = address || currentUser.address;
        const imageToUpdate = image || currentUser.image; // Keep current image if no new image uploaded

        // SQL query to update the profile
        const updateSql = `
            UPDATE user1 SET 
                firstname = ?, 
                middlename = ?, 
                lastname = ?, 
                email = ?, 
                gender = ?, 
                address = ?, 
                image = ? 
            WHERE id = ?`;

        db.query(updateSql, [updatedFirstname, updatedMiddlename, updatedLastname, updatedEmail, updatedGender, updatedAddress, imageToUpdate, userId], (err) => {
            if (err) {
                console.error("Error updating profile:", err);
                return res.status(500).json({ message: 'Error updating profile' });
            }
            res.json({ message: 'Profile updated successfully' });
        });
    });
});




// Login endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM user1 WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ Message: "Server Side Error" });
        }
        if (data.length > 0) {
            const user = data[0];
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
                            currentPassword:user.currentPassword, 
                            newPassword:user.newPassword, 
                            confirmPassword: user.confirmPassword,
                            rating: user.rating,
                            message: user.message
                        },
                        "secret-key",
                        { expiresIn: "30d" }
                    );

                    // Set the JWT token in a cookie
                    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
                    return res.json({
                        Status: "Success",
                        firstname: user.firstname,
                        middlename: user.middlename,
                        lastname: user.lastname,
                        email: user.email,
                        image: user.image,
                        gender: user.gender,
                        address: user.address,
                        currentPassword:user.currentPassword, 
                        newPassword:user.newPassword, 
                        confirmPassword: user.confirmPassword,
                        rating: user.rating,
                        message: user.message
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

// Password change endpoint (Protected by JWT middleware)
app.post('/password-changes', verifyUser, async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
  
    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New passwords do not match' });
    }
  
    try {
      // Retrieve the user's current password from the database using the user ID from JWT
      db.query('SELECT password FROM user1 WHERE id = ?', [req.user.id], async (err, results) => { // Updated to req.user.id
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
  
        // Check if the user exists
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        const hashedPassword = results[0].password;
  
        // Verify the current password
        const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
        if (!isMatch) {
          return res.status(401).json({ error: 'Current password is incorrect' });
        }
  
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  
        // Update the password in the database
        db.query('UPDATE user1 SET password = ? WHERE id = ?', [hashedNewPassword, req.user.id], (err) => {
          if (err) {
            console.error('Error updating password:', err);
            return res.status(500).json({ error: 'Error updating password' });
          }
          res.status(200).json({ message: 'Password changed successfully' });
        });
      });
    } catch (err) {
      console.error('Unexpected error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  });


  
  // Feedback submission endpoint
  app.post('/submit-feedback', verifyUser, (req, res) => {
    const { rating, message } = req.body;
    const { firstname, lastname } = req.user; // Use user's name from token
  
    if (!rating || !message) {
      return res.status(400).send('Rating and message are required.');
    }
  
    // Validate message content
    if (!isFormalMessage(message)) {
      return res.status(400).send('Please submit a proper message.');
    }
  
    // Insert feedback into the database
    const sql = `INSERT INTO feedback (rating, message, firstname, lastname) VALUES (?, ?, ?, ?)`;
    db.query(sql, [rating, message, firstname, lastname], (err, result) => {
      if (err) return res.status(500).send('Database error');
      res.status(200).send('Feedback submitted successfully');
    });
  });
  

app.post("/logout", (req, res) => {
    // Clear the token cookie
    res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'lax' });
    
    // Optionally, send a success message
    res.json({ message: 'Logout successful' });
});

app.post("/gotoregister", (req, res) => {
    // Clear the token cookie
    res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'lax' });
    
    // Optionally, send a success message
    res.json({ message: 'Logout successful' });
});

app.post("/gotologin", (req, res) => {
    // Clear the token cookie
    res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'lax' });
    
    // Optionally, send a success message
    res.json({ message: 'Logout successful' });
});


app.post('/api/register', async (req, res) => {
    const { firstname, middlename, lastname, email, password, address, gender } = req.body;
  
    // Basic validation
    if (!firstname || !middlename || !lastname || !email || !password || !address || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into database
      const query = 'INSERT INTO user1 (firstname, middlename, lastname, email, password, address, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(query, [firstname, middlename, lastname, email, hashedPassword, address, gender], (err, results) => {
        if (err) {
          console.error(err); // Log the error for debugging
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
      });
    } catch (error) {
      console.error(error); // Log any unexpected errors
      res.status(500).json({ error: 'Internal server error' });
    }
});



app.use('/uploads/images', express.static('D:/capstone-dashboard/backend-dashboard1/uploads/images'));


//API endpoint to fetch images and species details
app.get('/api/images', (req, res) => {
    const sql = 'SELECT * FROM species'; // Query to fetch data from the species table
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching images:', err);
            return res.status(500).json({ error: 'Failed to fetch images' });
        }
        res.json(result); // Return species data, including image filenames
    });
});

app.get('/api/species', (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Name query parameter is required' });
    }

    // Search across specificname, commonname, scientificname, and speciescategory (classification)
    const query = `SELECT specificname, commonname, scientificname, location, speciescategory, uploadimage 
                   FROM species 
                   WHERE specificname = ? OR commonname = ? OR scientificname = ? OR speciescategory = ?`;

    db.query(query, [name, name, name, name], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            const species = results[0];

            // Geocode the species' location
            const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(species.location)}`;

            axios.get(geocodeUrl, { timeout: 5000 })
                .then(response => {
                    if (response.data.length > 0) {
                        const { lat, lon } = response.data[0];
                        const speciesData = {
                            ...species,
                            latitude: parseFloat(lat),
                            longitude: parseFloat(lon)
                        };
                        res.json(speciesData);
                    } else {
                        res.status(404).json({ error: 'Location not found' });
                    }
                })
                .catch(err => {
                    res.status(500).json({ error: 'Geocoding error' });
                });
        } else {
            res.json(null);  // No results found
        }
    });
});

// Start the server on port 8081
app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
