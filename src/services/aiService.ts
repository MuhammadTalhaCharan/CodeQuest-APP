import { AIMessage } from '../types';

export interface MentorContext {
  userName: string;
  selectedLanguage: string;
  currentTopic: string;
  userLevel: number;
}

export class AIMentorService {
  async askMentor(
    userQuestion: string,
    history: AIMessage[],
    context: MentorContext
  ): Promise<{ text: string; hintCard?: { title: string; content: string; actionLabel?: string } }> {
    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userQuestion,
          history: history.slice(-6).map((h) => ({
            role: h.sender === 'user' ? 'user' : 'model',
            content: h.text,
          })),
          context,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          return {
            text: data.reply,
            hintCard: data.hintCard || undefined,
          };
        }
      }
    } catch {
      // Fallback to intelligent local pedagogical system
    }

    return this.generatePedagogicalFallback(userQuestion, context);
  }

  private generatePedagogicalFallback(
    question: string,
    context: MentorContext
  ): { text: string; hintCard?: { title: string; content: string; actionLabel?: string } } {
    const q = question.toLowerCase();

    if (q.includes('loop') || q.includes('for') || q.includes('while')) {
      return {
        text: `You're getting better! 👏 I noticed you're exploring loops in ${context.selectedLanguage}. Let's master the iteration counter step by step.`,
        hintCard: {
          title: '💡 Hint: How Loops Work',
          content: 'A loop helps you repeat the same code multiple times without writing it again and again.',
          actionLabel: 'Start Practice',
        },
      };
    }

    if (q.includes('variable') || q.includes('box') || q.includes('store')) {
      return {
        text: `Variables in ${context.selectedLanguage} act just like labeled storage boxes in your computer's RAM.`,
        hintCard: {
          title: '💡 Hint: Memory Labels',
          content: 'Assigning a value like score = 100 puts the number 100 inside the box named "score".',
          actionLabel: 'Try Variable Puzzle',
        },
      };
    }

    if (q.includes('condition') || q.includes('if') || q.includes('else')) {
      return {
        text: `Conditionals allow your character to make smart choices! If a condition evaluates to True, the branch executes; otherwise, it jumps to else.`,
        hintCard: {
          title: '💡 Hint: Decision Paths',
          content: 'Always ensure your comparison operator (like ==, <, or >) compares two compatible data types.',
          actionLabel: 'Test Condition',
        },
      };
    }

    if (q.includes('hint') || q.includes('stuck') || q.includes('help')) {
      return {
        text: `Don't worry, every senior programmer gets stuck! Let's break the challenge into smaller sub-problems.`,
        hintCard: {
          title: '💡 Step-by-Step Hint',
          content: `In ${context.selectedLanguage}, trace each line with pen and paper: what is the current value of each variable at step 1?`,
          actionLabel: 'Review Code',
        },
      };
    }

    return {
      text: `Great question, ${context.userName}! In ${context.selectedLanguage}, keeping your syntax clean and testing with small examples is the key to mastery. How can I guide your next challenge?`,
      hintCard: {
        title: '💡 Mentor Tip',
        content: 'Try running a mini-experiment in our Interactive Code Sandbox to see the immediate result!',
        actionLabel: 'Start Practice',
      },
    };
  }
}

export const aiMentor = new AIMentorService();
