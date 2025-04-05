import { Request, Response } from 'express';
import { createTraining, fillRandomValues, getTrainingById, getTrainingsWithRandomValues } from '../db/training';

export const createTrainingController = async (req: Request, res: Response) => {
  try {
    const { userId, startTime, duration, calories, pulse, temperature, oxygen } = req.body;
    if (!userId || !startTime || !duration) {
      res.status(400).json({ message: 'userId, startTime, and duration are required' });
      return;
    }

    const trainingData = {
      startTime: new Date(startTime),
      duration,
      calories,
      pulse,
      temperature,
      oxygen,
    };

    const newTraining = await createTraining(userId, trainingData);
    res.status(201).json(newTraining);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating training' });
  }
};

export const getTrainingByIdController = async (req: Request, res: Response) => {
  try {
    const training = await getTrainingById(Number(req.params.id));
    if (!training) {
      res.status(404).json({ message: 'Training not found' });
      return;
    }
    const updatedTraining = await fillRandomValues(training);
    res.status(200).json(updatedTraining);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting training' });
  }
};

export const getUserTrainingsController = async (req: Request, res: Response) => {
  try {
    const trainings = await getTrainingsWithRandomValues(Number(req.params.userId));
    res.status(200).json(trainings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting trainings' });
  }
};