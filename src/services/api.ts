import axios from 'axios';
import { Exercise } from '../types';

// Mock authentication API
export const authAPI = {
  login: async (username: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (username && password) {
      return {
        user: {
          id: '1',
          username: username,
          email: username + '@fitbuddy.com',
          name: username.charAt(0).toUpperCase() + username.slice(1),
        },
        token: 'mock-jwt-token-' + Date.now(),
      };
    }
    throw new Error('Invalid credentials');
  },

  register: async (name: string, username: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      user: {
        id: Date.now().toString(),
        username,
        email,
        name,
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },
};

// API Ninjas Fitness API
const FITNESS_API_KEY = 'YOUR_API_KEY_HERE'; // Users should get their own API key from https://api-ninjas.com/
const FITNESS_API_BASE_URL = 'https://api.api-ninjas.com/v1';

// Fallback mock data when API key is not available
const mockExercises: Exercise[] = [
  {
    name: 'Push-ups',
    type: 'strength',
    muscle: 'chest',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Get into a plank position with your arms straight. Lower your body until your chest nearly touches the floor. Push yourself back up to the starting position.',
  },
  {
    name: 'Squats',
    type: 'strength',
    muscle: 'quadriceps',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Stand with feet shoulder-width apart. Lower your body by bending your knees and hips. Keep your back straight and chest up. Return to starting position.',
  },
  {
    name: 'Plank',
    type: 'strength',
    muscle: 'abdominals',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Get into a forearm plank position with your body in a straight line. Hold this position, engaging your core muscles.',
  },
  {
    name: 'Lunges',
    type: 'strength',
    muscle: 'quadriceps',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Step forward with one leg, lowering your hips until both knees are bent at 90 degrees. Push back to starting position and repeat with other leg.',
  },
  {
    name: 'Burpees',
    type: 'cardio',
    muscle: 'quadriceps',
    equipment: 'body_only',
    difficulty: 'intermediate',
    instructions: 'Start standing, drop into a squat, kick feet back into plank, do a push-up, jump feet forward, and explosively jump up.',
  },
  {
    name: 'Mountain Climbers',
    type: 'cardio',
    muscle: 'abdominals',
    equipment: 'body_only',
    difficulty: 'intermediate',
    instructions: 'Start in plank position. Bring one knee toward chest, then quickly switch legs in a running motion.',
  },
  {
    name: 'Jumping Jacks',
    type: 'cardio',
    muscle: 'quadriceps',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Start standing with arms at sides. Jump while spreading legs and raising arms overhead. Return to starting position.',
  },
  {
    name: 'Bicycle Crunches',
    type: 'strength',
    muscle: 'abdominals',
    equipment: 'body_only',
    difficulty: 'intermediate',
    instructions: 'Lie on your back with hands behind head. Bring opposite elbow to opposite knee in a cycling motion.',
  },
  {
    name: 'Tricep Dips',
    type: 'strength',
    muscle: 'triceps',
    equipment: 'body_only',
    difficulty: 'intermediate',
    instructions: 'Using a bench or chair, lower your body by bending your elbows, then push back up.',
  },
  {
    name: 'High Knees',
    type: 'cardio',
    muscle: 'quadriceps',
    equipment: 'body_only',
    difficulty: 'beginner',
    instructions: 'Run in place while lifting knees as high as possible with each step.',
  },
];

export const fitnessAPI = {
  getExercises: async (muscle?: string): Promise<Exercise[]> => {
    try {
      // If API key is set and valid, use real API
      if (FITNESS_API_KEY && FITNESS_API_KEY !== 'YOUR_API_KEY_HERE') {
        const response = await axios.get(`${FITNESS_API_BASE_URL}/exercises`, {
          params: { muscle: muscle || 'chest' },
          headers: { 'X-Api-Key': FITNESS_API_KEY },
        });
        return response.data;
      }
      
      // Otherwise use mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (muscle) {
        return mockExercises.filter(ex => ex.muscle.toLowerCase() === muscle.toLowerCase());
      }
      
      return mockExercises;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      // Fallback to mock data on error
      return mockExercises;
    }
  },

  searchExercises: async (name: string): Promise<Exercise[]> => {
    try {
      if (FITNESS_API_KEY && FITNESS_API_KEY !== 'YOUR_API_KEY_HERE') {
        const response = await axios.get(`${FITNESS_API_BASE_URL}/exercises`, {
          params: { name },
          headers: { 'X-Api-Key': FITNESS_API_KEY },
        });
        return response.data;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockExercises.filter(ex => 
        ex.name.toLowerCase().includes(name.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching exercises:', error);
      return mockExercises.filter(ex => 
        ex.name.toLowerCase().includes(name.toLowerCase())
      );
    }
  },
};
