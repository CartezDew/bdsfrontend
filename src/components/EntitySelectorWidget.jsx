import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: 1,
    question: "What's your expected annual business income?",
    options: [
      { value: "low", label: "Under $50,000", points: { llc: 3, scorp: 2, ccorp: 1 } },
      { value: "medium", label: "$50,000 - $150,000", points: { llc: 2, scorp: 3, ccorp: 2 } },
      { value: "high", label: "Over $150,000", points: { llc: 1, scorp: 3, ccorp: 3 } }
    ]
  },
  {
    id: 2,
    question: "How many owners/investors do you plan to have?",
    options: [
      { value: "single", label: "Just me (single owner)", points: { llc: 3, scorp: 2, ccorp: 1 } },
      { value: "few", label: "2-5 owners", points: { llc: 2, scorp: 3, ccorp: 2 } },
      { value: "many", label: "6+ owners or investors", points: { llc: 1, scorp: 2, ccorp: 3 } }
    ]
  },
  {
    id: 3,
    question: "What's your primary business goal?",
    options: [
      { value: "simplicity", label: "Keep it simple and flexible", points: { llc: 3, scorp: 2, ccorp: 1 } },
      { value: "tax", label: "Minimize taxes", points: { llc: 2, scorp: 3, ccorp: 2 } },
      { value: "growth", label: "Raise capital and grow big", points: { llc: 1, scorp: 2, ccorp: 3 } }
    ]
  },
  {
    id: 4,
    question: "How do you plan to pay yourself?",
    options: [
      { value: "draws", label: "Take draws/distributions", points: { llc: 3, scorp: 2, ccorp: 1 } },
      { value: "salary", label: "Pay yourself a salary", points: { llc: 2, scorp: 3, ccorp: 2 } },
      { value: "dividends", label: "Pay dividends to shareholders", points: { llc: 1, scorp: 2, ccorp: 3 } }
    ]
  },
  {
    id: 5,
    question: "What's your timeline for business growth?",
    options: [
      { value: "slow", label: "Steady, gradual growth", points: { llc: 3, scorp: 2, ccorp: 1 } },
      { value: "moderate", label: "Moderate growth with some investment", points: { llc: 2, scorp: 3, ccorp: 2 } },
      { value: "fast", label: "Rapid growth and scaling", points: { llc: 1, scorp: 2, ccorp: 3 } }
    ]
  }
];

const entityInfo = {
  llc: {
    name: "LLC (Limited Liability Company)",
    pros: [
      "Simple setup and maintenance",
      "Flexible management structure",
      "Pass-through taxation",
      "Limited personal liability",
      "Fewer formal requirements"
    ],
    cons: [
      "Limited ability to raise capital",
      "May have higher self-employment taxes",
      "Less attractive to investors",
      "State-specific regulations vary"
    ],
    bestFor: "Small businesses, freelancers, and those seeking simplicity"
  },
  scorp: {
    name: "S-Corporation",
    pros: [
      "Pass-through taxation",
      "Potential tax savings on self-employment",
      "Professional appearance",
      "Limited personal liability",
      "Can have up to 100 shareholders"
    ],
    cons: [
      "More complex than LLC",
      "Strict ownership requirements",
      "Must pay reasonable salary",
      "Limited to US citizens/residents"
    ],
    bestFor: "Growing businesses with moderate income seeking tax advantages"
  },
  ccorp: {
    name: "C-Corporation",
    pros: [
      "Unlimited growth potential",
      "Attractive to investors",
      "Can issue multiple stock classes",
      "Professional credibility",
      "Employee benefit deductions"
    ],
    cons: [
      "Double taxation (corporate + personal)",
      "Most complex structure",
      "Highest compliance costs",
      "More formal requirements"
    ],
    bestFor: "High-growth companies planning to raise capital or go public"
  }
};

const EntitySelectorWidget = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({ llc: 0, scorp: 0, ccorp: 0 });

  const handleAnswer = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final scores
      const finalScores = { llc: 0, scorp: 0, ccorp: 0 };
      Object.values(newAnswers).forEach(answer => {
        finalScores.llc += answer.points.llc;
        finalScores.scorp += answer.points.scorp;
        finalScores.ccorp += answer.points.ccorp;
      });
      setScores(finalScores);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScores({ llc: 0, scorp: 0, ccorp: 0 });
  };

  const getRecommendation = () => {
    const maxScore = Math.max(scores.llc, scores.scorp, scores.ccorp);
    if (scores.llc === maxScore) return 'llc';
    if (scores.scorp === maxScore) return 'scorp';
    return 'ccorp';
  };

  if (showResults) {
    const recommendation = getRecommendation();
    const recommendedEntity = entityInfo[recommendation];
    
    return (
      <motion.div 
        className="entity-results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="results-header">
          <h3>Your Business Entity Analysis</h3>
          <p className="disclaimer">
            *This is for educational purposes only and does not constitute legal advice. 
            Consult with a qualified professional for your specific situation.
          </p>
        </div>

        <div className="recommendation-section">
          <h4>🏆 Recommended: {recommendedEntity.name}</h4>
          <p className="best-for">Best for: {recommendedEntity.bestFor}</p>
        </div>

        <div className="entity-comparison">
          {Object.entries(entityInfo).map(([key, entity]) => (
            <motion.div 
              key={key}
              className={`entity-card ${key === recommendation ? 'recommended' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: key === 'llc' ? 0.1 : key === 'scorp' ? 0.2 : 0.3 }}
            >
              <h5>{entity.name}</h5>
              <div className="score-display">
                <span className="score-label">Score:</span>
                <span className="score-value">{scores[key]}/15</span>
              </div>
              
              <div className="pros-cons">
                <div className="pros">
                  <h6>✅ Pros</h6>
                  <ul>
                    {entity.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h6>⚠️ Cons</h6>
                  <ul>
                    {entity.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="cta-section">
          <h4>Ready to Make the Right Choice?</h4>
          <p>Our experts can help you set up the perfect business structure for your needs.</p>
          <button className="cta-button" onClick={() => window.location.href = '/contact'}>
            Talk to Us About Your Business Structure
          </button>
          <button className="reset-button" onClick={resetQuiz}>
            Take Quiz Again
          </button>
        </div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div 
      className="entity-selector-widget"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="widget-header">
        <h3>🏢 Business Entity Selector</h3>
        <p>Answer 5 quick questions to understand which business structure fits your needs best</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">Question {currentQuestion + 1} of {questions.length}</span>
      </div>

      <div className="question-section">
        <h4>{question.question}</h4>
        <div className="options">
          {question.options.map((option, index) => (
            <motion.button
              key={option.value}
              className="option-button"
              onClick={() => handleAnswer(question.id, option)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="widget-footer">
        <p className="disclaimer">
          *This tool is for educational purposes only and does not constitute legal advice. 
          Results are based on general business principles and may not apply to your specific situation.
        </p>
      </div>
    </motion.div>
  );
};

export default EntitySelectorWidget;
