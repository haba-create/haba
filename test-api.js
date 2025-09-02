require('dotenv').config();
const axios = require('axios');

console.log('Testing API Configuration...\n');

// Check environment variables
console.log('=== Environment Variables ===');
console.log('CLAUDE_API_KEY:', process.env.CLAUDE_API_KEY ? `Present (${process.env.CLAUDE_API_KEY.length} chars)` : 'MISSING');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? `Present (${process.env.OPENAI_API_KEY.length} chars)` : 'MISSING');
console.log();

// Test Claude API
async function testClaude() {
  if (!process.env.CLAUDE_API_KEY) {
    console.log('❌ Claude API: No API key configured');
    return;
  }

  console.log('Testing Claude API...');
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-2.1',
        max_tokens: 100,
        messages: [
          {
            role: 'user',
            content: 'Say "API test successful" in exactly 3 words.'
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    console.log('✅ Claude API: Working');
    console.log('Response:', response.data.content[0].text);
  } catch (error) {
    console.log('❌ Claude API: Failed');
    console.log('Error:', error.response?.status, error.response?.statusText);
    console.log('Details:', error.response?.data);
  }
  console.log();
}

// Test OpenAI API
async function testOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    console.log('❌ OpenAI API: No API key configured');
    return;
  }

  console.log('Testing OpenAI API...');
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Say "API test successful" in exactly 3 words.'
          }
        ],
        max_tokens: 10
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    console.log('✅ OpenAI API: Working');
    console.log('Response:', response.data.choices[0].message.content);
  } catch (error) {
    console.log('❌ OpenAI API: Failed');
    console.log('Error:', error.response?.status, error.response?.statusText);
    console.log('Details:', error.response?.data);
  }
  console.log();
}

// Run tests
async function runTests() {
  await testClaude();
  await testOpenAI();
  
  console.log('=== Test Complete ===');
  console.log('If both APIs show as working, your document generation should function correctly.');
  console.log('If you see authentication errors (401), please check your API keys in the .env file.');
}

runTests();