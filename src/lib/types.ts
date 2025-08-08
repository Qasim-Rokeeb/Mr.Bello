export type Tone = 'Gentle' | 'Encouraging' | 'Formal' | 'Fun' | 'Sarcastic' | 'Creative';
export type Complexity = 'simplified' | 'technical';
export type LearningMode = 'topic' | 'course';
export type ExampleDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Settings {
  name: string;
  tone: Tone;
  humor: boolean;
}

export type MessageRole = 'user' | 'bot';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  topic?: string;
  funnyGesture?: string;
  courseTopics?: string[];
  diagram?: string;
  table?: string;
}
