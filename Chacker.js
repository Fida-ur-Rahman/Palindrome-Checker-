//  Chacker .js
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const textInput = document.getElementById('text-input');
            const checkBtn = document.getElementById('check-btn');
            const clearBtn = document.getElementById('clear-btn');
            const resultSection = document.getElementById('result-section');
            const resultIcon = document.getElementById('result-icon');
            const resultText = document.getElementById('result-text');
            const palindromeDefinition = document.getElementById('palindrome-definition');
            const palindromeExample = document.getElementById('palindrome-example');
            const examplesList = document.getElementById('examples-list');
            
            // Palindrome examples
            const palindromeExamples = [
                {text: "racecar", isPalindrome: true},
                {text: "A man, a plan, a canal: Panama", isPalindrome: true},
                {text: "Madam", isPalindrome: true},
                {text: "noon", isPalindrome: true},
                {text: "civic", isPalindrome: true},
                {text: "hello", isPalindrome: false},
                {text: "world", isPalindrome: false},
                {text: "javascript", isPalindrome: false},
                {text: "12321", isPalindrome: true},
                {text: "12345", isPalindrome: false},
                {text: "Was it a car or a cat I saw?", isPalindrome: true},
                {text: "Never odd or even", isPalindrome: true}
            ];
            
            // Initialize examples list
            function initExamples() {
                palindromeExamples.forEach(example => {
                    const li = document.createElement('li');
                    li.textContent = example.text;
                    li.classList.add(example.isPalindrome ? 'palindrome-true' : 'palindrome-false');
                    
                    // Add click event to populate input with example
                    li.addEventListener('click', () => {
                        textInput.value = example.text;
                        checkPalindrome(example.text);
                    });
                    
                    examplesList.appendChild(li);
                });
            }
            
            // Function to check if text is a palindrome
            function isPalindrome(str) {
                // Remove non-alphanumeric characters and convert to lowercase
                const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                // Check if the cleaned string is equal to its reverse
                return cleanedStr === cleanedStr.split('').reverse().join('');
            }
            
            // Function to update the result display
            function updateResult(isPalindrome, originalText) {
                // Remove previous animation class
                resultSection.classList.remove('result-animation');
                
                // Force reflow to restart animation
                void resultSection.offsetWidth;
                
                // Add animation class
                resultSection.classList.add('result-animation');
                
                if (isPalindrome) {
                    resultIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
                    resultIcon.style.color = '#2ecc71';
                    resultText.textContent = `"${originalText}" is a Palindrome!`;
                    resultText.style.color = '#2ecc71';
                    palindromeDefinition.textContent = `"${originalText}" reads the same forwards and backwards!`;
                    palindromeExample.textContent = `Forwards: ${originalText} | Backwards: ${originalText}`;
                } else {
                    resultIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
                    resultIcon.style.color = '#e74c3c';
                    resultText.textContent = `"${originalText}" is NOT a Palindrome`;
                    resultText.style.color = '#e74c3c';
                    
                    // Show what it would be backwards
                    const cleanedStr = originalText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                    const reversedStr = cleanedStr.split('').reverse().join('');
                    
                    palindromeDefinition.textContent = `"${originalText}" does not read the same forwards and backwards.`;
                    palindromeExample.textContent = `Forwards: ${cleanedStr} | Backwards: ${reversedStr}`;
                }
            }
            
            // Function to check palindrome and update UI
            function checkPalindrome(text) {
                if (!text.trim()) {
                    // Reset to initial state if input is empty
                    resultIcon.innerHTML = '<i class="fas fa-question-circle"></i>';
                    resultIcon.style.color = '#6a11cb';
                    resultText.textContent = 'Enter text to check';
                    resultText.style.color = '#333';
                    palindromeDefinition.textContent = 'A palindrome is a word, phrase, or sequence that reads the same forwards and backwards, ignoring spaces, punctuation, and capitalization.';
                    palindromeExample.textContent = '';
                    return;
                }
                
                const palindromeResult = isPalindrome(text);
                updateResult(palindromeResult, text);
            }
            
            // Event Listeners
            checkBtn.addEventListener('click', () => {
                checkPalindrome(textInput.value);
            });
            
            clearBtn.addEventListener('click', () => {
                textInput.value = '';
                textInput.focus();
                checkPalindrome('');
            });
            
            textInput.addEventListener('keyup', (event) => {
                // Check on Enter key press
                if (event.key === 'Enter') {
                    checkPalindrome(textInput.value);
                }
                
                // Real-time checking as user types (optional)
                // Uncomment below for real-time checking
                // checkPalindrome(textInput.value);
            });
            
            // Initialize the examples list
            initExamples();
            
            // Focus on input on page load
            textInput.focus();
        });
