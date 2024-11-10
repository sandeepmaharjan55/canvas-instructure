const express = require('express');
const synaptic = require('synaptic'); // Import Synaptic
const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

// Create a neural network using Synaptic
const { Network, Layer, Architect } = synaptic;

// Define the architecture of the neural network
const inputLayer = new Layer(4);  // 4 input features (Total Activity, Attendance, Participation, Page Views)
const hiddenLayer = new Layer(5); // Hidden layer with 5 neurons
const outputLayer = new Layer(1); // Output layer with 1 neuron (binary classification: Pass or Fail)

// Connect the layers
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

// Create the neural network
const myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});

// Training data (e.g., Total Activity, Attendance, Participation, Page Views, Discussion, Current Grade Score)
const trainingData = [
  { input: [2500, 80, 150, 100, 10, 90], output: [1] },  // Example student: Pass
  { input: [12, 80, 60, 60, 1, 40], output: [0] },      // Example student: Fail
  { input: [4000, 95, 205, 11, 80], output: [1] },      // Example student: Pass
  { input: [5, 60, 50, 50, 1, 50], output: [0] },       // Example student: Fail
];

// Training the network
function trainNetwork() {
  const trainer = new synaptic.Trainer(myNetwork);
  trainer.train(trainingData, {
    rate: 0.1, // Learning rate
    iterations: 20000, // Number of iterations (epochs)
    error: 0.005, // Desired error threshold
    shuffle: true, // Shuffle data before training
  });
  console.log("Network trained.");
}

// Call the training function
trainNetwork();

// Prediction endpoint
router.post('/predict', (req, res) => {
    console.log(req.body);
  const { totalActivity, attendance, participation, pageViews, discussionCount, currentGradeScore } = req.body;

  // Ensure the input data is valid
  if (totalActivity == undefined || attendance == undefined || participation == undefined || pageViews == undefined || discussionCount == undefined|| currentGradeScore == undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Make prediction using the trained model
    const prediction = myNetwork.activate([totalActivity, attendance, participation, pageViews, discussionCount, currentGradeScore])[0];

    // Convert prediction to Pass/Fail
    const result = prediction >= 0.5 ? 'Pass' : 'Fail';

    res.json({ prediction: result });
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: 'Error making prediction' });
  }
});

// Export the router module
module.exports = router;
