const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const CodingProblem = require("./models/CodingProblem");

const sampleProblems = [
    {
        title: "Two Sum",
        subject: "DSA Beginner",
        difficulty: "Easy",
        description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers such that they add up to <code>target</code>.</p>
<p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
<h4>Example:</h4>
<pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre>`,
        preCode: {
            python: `def twoSum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

# Test execution
print(twoSum([2, 7, 11, 15], 9))`,
            javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));`,
            java: `import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        int[] res = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(res));
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        numMap[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> ans = twoSum(nums, 9);
    cout << "[" << ans[0] << ", " << ans[1] << "]" << endl;
    return 0;
}`
        },
        testCases: [
            {
                input: "[2, 7, 11, 15], 9",
                output: "[0, 1]",
                isHidden: false
            },
            {
                input: "[3, 2, 4], 6",
                output: "[1, 2]",
                isHidden: true
            }
        ]
    },
    {
        title: "Palindrome Number",
        subject: "DSA Beginner",
        difficulty: "Easy",
        description: `<p>Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a palindrome, and <code>false</code> otherwise.</p>
<h4>Example 1:</h4>
<pre><code>Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.</code></pre>
<h4>Example 2:</h4>
<pre><code>Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.</code></pre>`,
        preCode: {
            python: `def isPalindrome(x: int) -> bool:
    # Write your code here
    s = str(x)
    return s == s[::-1]

print(isPalindrome(121))`,
            javascript: `function isPalindrome(x) {
    const s = x.toString();
    return s === s.split('').reverse().join('');
}

console.log(isPalindrome(121));`,
            java: `public class Main {
    public static boolean isPalindrome(int x) {
        if (x < 0) return false;
        int original = x, reversed = 0;
        while (x != 0) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }
        return original == reversed;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome(121));
    }
}`,
            cpp: `#include <iostream>
using namespace std;

bool isPalindrome(int x) {
    if (x < 0) return false;
    long long original = x, reversed = 0;
    while (x != 0) {
        reversed = reversed * 10 + x % 10;
        x /= 10;
    }
    return original == reversed;
}

int main() {
    cout << (isPalindrome(121) ? "true" : "false") << endl;
    return 0;
}`
        },
        testCases: [
            {
                input: "121",
                output: "true",
                isHidden: false
            },
            {
                input: "-121",
                output: "false",
                isHidden: false
            }
        ]
    },
    {
        title: "Valid Parentheses",
        subject: "DSA Advanced",
        difficulty: "Medium",
        description: `<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
<p>An input string is valid if:</p>
<ol>
<li>Open brackets must be closed by the same type of brackets.</li>
<li>Open brackets must be closed in the correct order.</li>
<li>Every close bracket has a corresponding open bracket of the same type.</li>
</ol>`,
        preCode: {
            python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack

print(isValid("()[]{}"))`,
            javascript: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}

console.log(isValid("()[]{}"));`,
            java: `import java.util.*;

public class Main {
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isValid("()[]{}"));
    }
}`
        },
        testCases: [
            {
                input: "()[]{}",
                output: "true",
                isHidden: false
            },
            {
                input: "(]",
                output: "false",
                isHidden: false
            }
        ]
    },
    {
        title: "Reverse String in-place",
        subject: "Web Development",
        difficulty: "Easy",
        description: `<p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>
<p>You must do this by modifying the input array in-place with <code>O(1)</code> extra memory.</p>`,
        preCode: {
            python: `def reverseString(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return s

s = ["h","e","l","l","o"]
print(reverseString(s))`,
            javascript: `function reverseString(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
    return s;
}

console.log(reverseString(["h","e","l","l","o"]));`
        },
        testCases: [
            {
                input: "['h','e','l','l','o']",
                output: "['o','l','l','e','h']",
                isHidden: false
            }
        ]
    },
    // SQL Challenge 1
    {
        title: "Find Second Highest Salary",
        subject: "SQL",
        difficulty: "Medium",
        description: `<p>Write an SQL query to report the second highest salary from the <code>Employees</code> table. If there is no second highest salary, the query should report <code>NULL</code>.</p>
<h4>Table: Employees</h4>
<pre><code>+----+-----------------+-------------+--------+
| id | name            | department  | salary |
+----+-----------------+-------------+--------+
| 1  | Alice Smith     | Engineering | 95000  |
| 2  | Bob Jones       | Engineering | 80000  |
| 3  | Charlie Brown   | Marketing   | 65000  |
| 4  | Diana Prince    | Marketing   | 72000  |
| 5  | Evan Wright     | Finance     | 90000  |
| 6  | Fiona Gallagher | Engineering | 105000 |
+----+-----------------+-------------+--------+</code></pre>
<h4>Expected Output:</h4>
<pre><code>+---------------------+
| SecondHighestSalary |
+---------------------+
| 95000               |
+---------------------+</code></pre>`,
        preCode: {
            sql: `-- Write your SQL query below
-- Table available: Employees
SELECT MAX(salary) AS SecondHighestSalary 
FROM Employees 
WHERE salary < (SELECT MAX(salary) FROM Employees);`
        },
        testCases: [
            {
                input: "",
                output: `+---------------------+
| SecondHighestSalary |
+---------------------+
| 95000               |
+---------------------+
(1 rows in set)`,
                isHidden: false
            }
        ]
    },
    // SQL Challenge 2
    {
        title: "Department Salary Statistics",
        subject: "SQL",
        difficulty: "Easy",
        description: `<p>Write an SQL query to calculate the number of employees (<code>emp_count</code>) and the maximum salary (<code>top_pay</code>) for each department in the <code>Employees</code> table.</p>
<p>Sort the result by <code>top_pay</code> in descending order.</p>
<h4>Expected Output:</h4>
<pre><code>+-------------+-----------+---------+
| department  | emp_count | top_pay |
+-------------+-----------+---------+
| Engineering | 3         | 105000  |
| Finance     | 1         | 90000   |
| Marketing   | 2         | 72000   |
+-------------+-----------+---------+</code></pre>`,
        preCode: {
            sql: `-- Write your SQL query below
SELECT department, COUNT(*) AS emp_count, MAX(salary) AS top_pay
FROM Employees
GROUP BY department
ORDER BY top_pay DESC;`
        },
        testCases: [
            {
                input: "",
                output: `+-------------+-----------+---------+
| department  | emp_count | top_pay |
+-------------+-----------+---------+
| Engineering | 3         | 105000  |
| Finance     | 1         | 90000   |
| Marketing   | 2         | 72000   |
+-------------+-----------+---------+
(3 rows in set)`,
                isHidden: false
            }
        ]
    },
    // SQL Challenge 3
    {
        title: "Customers Who Never Placed Orders",
        subject: "SQL",
        difficulty: "Easy",
        description: `<p>Find all customers from the <code>Customers</code> table who have never placed an order in the <code>Orders</code> table.</p>
<h4>Table: Customers</h4>
<pre><code>+----+-----------+-------------------+
| id | name      | email             |
+----+-----------+-------------------+
| 1  | John Doe  | john@example.com  |
| 2  | Jane Doe  | jane@example.com  |
| 3  | Bob Smith | bob@example.com   |
+----+-----------+-------------------+</code></pre>
<h4>Table: Orders</h4>
<pre><code>+----+-------------+------------+--------+
| id | customer_id | order_date | amount |
+----+-------------+------------+--------+
| 1  | 1           | 2026-01-15 | 250.00 |
| 2  | 1           | 2026-02-10 | 120.50 |
| 3  | 2           | 2026-03-05 | 499.99 |
+----+-------------+------------+--------+</code></pre>`,
        preCode: {
            sql: `-- Write your SQL query below
SELECT name AS Customers 
FROM Customers 
WHERE id NOT IN (SELECT customer_id FROM Orders WHERE customer_id IS NOT NULL);`
        },
        testCases: [
            {
                input: "",
                output: `+-----------+
| Customers |
+-----------+
| Bob Smith |
+-----------+
(1 rows in set)`,
                isHidden: false
            }
        ]
    },
    // React Challenge 1
    {
        title: "Interactive Counter with Step",
        subject: "React",
        difficulty: "Easy",
        description: `<p>Build an interactive counter component in React.</p>
<h4>Requirements:</h4>
<ul>
  <li>Display the current count in bold font</li>
  <li>An <strong>Increment (+1)</strong> button that increases the count</li>
  <li>A <strong>Decrement (-1)</strong> button that decreases the count</li>
  <li>A <strong>Reset</strong> button that restores the count back to 0</li>
  <li>Color-coded count: green if &gt; 0, red if &lt; 0, and gray/white if 0</li>
</ul>
<p><em>Use the 'Live Preview' tab to test and interact with your component in real-time!</em></p>`,
        preCode: {
            react: `import React, { useState } from 'react';

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="p-6 max-w-sm mx-auto bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-purple-400">Interactive Counter</h2>
            <div className={\`text-5xl font-black \${count > 0 ? 'text-emerald-400' : count < 0 ? 'text-rose-400' : 'text-slate-300'}\`}>
                {count}
            </div>
            <div className="flex justify-center gap-2">
                <button 
                    onClick={() => setCount(c => c + 1)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition active:scale-95"
                >
                    +1 Increment
                </button>
                <button 
                    onClick={() => setCount(c => c - 1)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition active:scale-95"
                >
                    -1 Decrement
                </button>
                <button 
                    onClick={() => setCount(0)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}`
        },
        testCases: []
    },
    // React Challenge 2
    {
        title: "Live Search & Filter Directory",
        subject: "React",
        difficulty: "Easy",
        description: `<p>Build a live filterable developer directory.</p>
<h4>Requirements:</h4>
<ul>
  <li>Include a controlled search <code>&lt;input /&gt;</code> field</li>
  <li>Filter the list of developers by either their name or role as the user types</li>
  <li>Display a clean message if no developers match the query</li>
</ul>
<p><em>Check the 'Live Preview' tab to test your filter interaction!</em></p>`,
        preCode: {
            react: `import React, { useState } from 'react';

const TEAM = [
    { id: 1, name: 'Alice Smith', role: 'Full Stack Engineer', dept: 'Engineering' },
    { id: 2, name: 'Bob Jones', role: 'Database Architect', dept: 'Data Systems' },
    { id: 3, name: 'Charlie Brown', role: 'React Frontend Developer', dept: 'UI/UX' },
    { id: 4, name: 'Diana Prince', role: 'DevOps & Cloud Lead', dept: 'Infrastructure' }
];

export default function App() {
    const [query, setQuery] = useState('');

    const filtered = TEAM.filter(member => 
        member.name.toLowerCase().includes(query.toLowerCase()) || 
        member.role.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="p-6 max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
            <div>
                <h2 className="text-lg font-bold text-white">Developer Directory</h2>
                <p className="text-xs text-slate-400">Type to filter team members in real-time</p>
            </div>
            
            <input 
                type="text" 
                placeholder="Search by name or role..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500 transition"
            />
            
            <div className="space-y-2">
                {filtered.map(member => (
                    <div key={member.id} className="p-3 bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-800">
                        <div>
                            <div className="text-sm font-bold text-white">{member.name}</div>
                            <div className="text-xs text-slate-400">{member.role}</div>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {member.dept}
                        </span>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <p className="text-center text-xs text-slate-500 py-4">No matching developers found.</p>
                )}
            </div>
        </div>
    );
}`
        },
        testCases: []
    },
    // React Challenge 3
    {
        title: "Todo Task Manager with Toggle",
        subject: "React",
        difficulty: "Medium",
        description: `<p>Build a dynamic Todo list component in React.</p>
<h4>Requirements:</h4>
<ul>
  <li>Input field to type a new task and add on button click or 'Enter' key</li>
  <li>Click a task to toggle its completed state (strike-through style)</li>
  <li>Delete button to remove a task from the list</li>
  <li>Counter indicating remaining pending tasks</li>
</ul>`,
        preCode: {
            react: `import React, { useState } from 'react';

export default function App() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Review SQL indexing questions', done: true },
        { id: 2, text: 'Build React Live Preview studio', done: false },
        { id: 3, text: 'Practice binary search challenge', done: false }
    ]);
    const [text, setText] = useState('');

    const addTask = () => {
        if (!text.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: text.trim(), done: false }]);
        setText('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const pending = tasks.filter(t => !t.done).length;

    return (
        <div className="p-6 max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Daily Focus Tasks</h2>
                <span className="text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                    {pending} pending
                </span>
            </div>

            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Add a new task..." 
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTask()}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500"
                />
                <button 
                    onClick={addTask}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-sm transition"
                >
                    Add
                </button>
            </div>

            <div className="space-y-2">
                {tasks.map(task => (
                    <div 
                        key={task.id} 
                        className="p-3 bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-800 gap-2"
                    >
                        <div 
                            onClick={() => toggleTask(task.id)}
                            className="flex items-center gap-2.5 cursor-pointer flex-1"
                        >
                            <span className="material-symbols-outlined text-[18px] text-purple-400">
                                {task.done ? 'check_box' : 'check_box_outline_blank'}
                            </span>
                            <span className={\`text-sm \${task.done ? 'line-through text-slate-500' : 'text-slate-200'}\`}>
                                {task.text}
                            </span>
                        </div>
                        <button 
                            onClick={() => deleteTask(task.id)}
                            className="text-slate-500 hover:text-rose-400 transition"
                        >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}`
        },
        testCases: []
    }
];

async function seed() {
    try {
        const mongoUri = process.env.DB_NAME;
        if (!mongoUri) {
            console.error("No DB_NAME in .env");
            process.exit(1);
        }
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB.");

        const count = await CodingProblem.countDocuments();
        if (count === 0) {
            console.log("Seeding sample coding problems...");
            await CodingProblem.insertMany(sampleProblems);
            console.log("Seeded " + sampleProblems.length + " coding problems successfully!");
        } else {
            console.log(`Database already has ${count} coding problems. Ensuring all sample problems exist...`);
            for (const prob of sampleProblems) {
                const existing = await CodingProblem.findOne({ title: prob.title });
                if (!existing) {
                    await CodingProblem.create(prob);
                    console.log(`Added missing problem: ${prob.title}`);
                }
            }
        }
        await mongoose.disconnect();
        console.log("Seed complete.");
    } catch (err) {
        console.error("Seed error:", err.message);
        process.exit(1);
    }
}

seed();
