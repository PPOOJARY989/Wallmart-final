// Differential Privacy Calculator Web Worker
self.onmessage = (event) => {
  const { type, data } = event.data

  switch (type) {
    case "INIT_DP_CALCULATION":
      initializeDPCalculation()
      break
    case "CALCULATE_NOISE":
      calculateNoise(data)
      break
    case "APPLY_DP_MECHANISM":
      applyDPMechanism(data)
      break
    default:
      console.log("Unknown message type:", type)
  }
}

function initializeDPCalculation() {
  console.log("Differential Privacy Calculator initialized")
  self.postMessage({
    type: "DP_RESULT",
    data: {
      status: "initialized",
      timestamp: new Date().toISOString(),
    },
  })
}

function calculateNoise(params) {
  const { epsilon = 1.0, sensitivity = 1.0, mechanism = "laplace" } = params || {}

  let noise
  if (mechanism === "laplace") {
    // Laplace mechanism: noise ~ Lap(0, sensitivity/epsilon)
    const scale = sensitivity / epsilon
    noise = generateLaplaceNoise(scale)
  } else if (mechanism === "gaussian") {
    // Gaussian mechanism: noise ~ N(0, (sensitivity * sqrt(2 * ln(1.25/delta)) / epsilon)^2)
    const delta = params.delta || 1e-5
    const sigma = (sensitivity * Math.sqrt(2 * Math.log(1.25 / delta))) / epsilon
    noise = generateGaussianNoise(0, sigma)
  } else {
    noise = 0
  }

  self.postMessage({
    type: "DP_RESULT",
    data: {
      noise,
      epsilon,
      sensitivity,
      mechanism,
      timestamp: new Date().toISOString(),
    },
  })
}

function applyDPMechanism(params) {
  const { originalValue, epsilon = 1.0, sensitivity = 1.0, mechanism = "laplace" } = params

  // Calculate noise
  let noise
  if (mechanism === "laplace") {
    const scale = sensitivity / epsilon
    noise = generateLaplaceNoise(scale)
  } else {
    const delta = params.delta || 1e-5
    const sigma = (sensitivity * Math.sqrt(2 * Math.log(1.25 / delta))) / epsilon
    noise = generateGaussianNoise(0, sigma)
  }

  const privatizedValue = originalValue + noise

  self.postMessage({
    type: "DP_RESULT",
    data: {
      originalValue,
      privatizedValue,
      noise,
      epsilon,
      mechanism,
      privacyBudgetUsed: epsilon,
      timestamp: new Date().toISOString(),
    },
  })
}

// Generate Laplace noise using inverse transform sampling
function generateLaplaceNoise(scale) {
  const u = Math.random() - 0.5
  return -scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u))
}

// Generate Gaussian noise using Box-Muller transform
function generateGaussianNoise(mean, stddev) {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()

  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
  return z * stddev + mean
}

// Privacy budget tracking
let privacyBudgetUsed = 0
const maxPrivacyBudget = 10.0 // Total privacy budget

function trackPrivacyBudget(epsilon) {
  privacyBudgetUsed += epsilon

  if (privacyBudgetUsed > maxPrivacyBudget) {
    self.postMessage({
      type: "DP_WARNING",
      data: {
        message: "Privacy budget exceeded!",
        budgetUsed: privacyBudgetUsed,
        maxBudget: maxPrivacyBudget,
      },
    })
  }

  return {
    used: privacyBudgetUsed,
    remaining: Math.max(0, maxPrivacyBudget - privacyBudgetUsed),
    percentage: (privacyBudgetUsed / maxPrivacyBudget) * 100,
  }
}
