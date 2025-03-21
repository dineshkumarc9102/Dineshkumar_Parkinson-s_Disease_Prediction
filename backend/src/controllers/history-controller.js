import History from '../models/history-model.js';

export const addHistory = async (req, res) => {
  const { symptoms, result, probability } = req.body;

  try {
    // Validate request
    if (!symptoms || !result || probability === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Get authenticated user info
    const { userId, patientId, fullName } = req.user;

    // Create new history record
    const newHistory = new History({
      userId, // Ensure this is included
      patientId,
      fullName,
      symptoms: {
        UPDRS: symptoms.UPDRS !== undefined ? symptoms.UPDRS : null, // Ensure 0 is saved
        Tremor: symptoms.Tremor !== undefined ? symptoms.Tremor : null,
        FunctionalAssessment: symptoms.FunctionalAssessment !== undefined ? symptoms.FunctionalAssessment : null,
        MoCA: symptoms.MoCA !== undefined ? symptoms.MoCA : null,
        Rigidity: symptoms.Rigidity !== undefined ? symptoms.Rigidity : null,
      },
      result,
      probability,
    });

    // Save to database
    const savedHistory = await newHistory.save();

    // Return success response
    res.status(201).json({
      success: true,
      data: savedHistory,
      message: 'History record added successfully',
    });
  } catch (error) {
    console.error('Error adding history:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { patientId } = req.user;
    const historyRecords = await History.find({ patientId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: historyRecords,
      message: 'History records retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching history:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};