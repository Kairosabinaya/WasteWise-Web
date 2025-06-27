import React, { useState } from 'react';
import { BookOpen, Star, Trophy, Play, CheckCircle, RotateCcw, School, ArrowRight, Clock, Award, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AppLogo, CameraFloatingButton } from '../components/ui';

const EducationPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [lessonProgress, setLessonProgress] = useState({});
  const [completedLessons, setCompletedLessons] = useState(['1', '2']); // Pre-completed lessons
  const [showLessonComplete, setShowLessonComplete] = useState(false);
  const [notification, setNotification] = useState(null);

  // Lessons data with dynamic completion status
  const getLessons = () => [
    {
      id: '1',
      title: 'Waste Management Basics',
      description: 'Learn the basic 3R concept: Reduce, Reuse, Recycle',
      duration: '10 minutes',
      difficulty: 'Beginner',
      points: 50,
      isCompleted: completedLessons.includes('1'),
      progress: completedLessons.includes('1') ? 1.0 : (lessonProgress['1'] || 0),
      icon: School,
      color: '#164c51',
    },
    {
      id: '2',
      title: 'Proper Waste Sorting',
      description: 'How to properly sort organic and inorganic waste',
      duration: '15 minutes',
      difficulty: 'Beginner',
      points: 75,
      isCompleted: completedLessons.includes('2'),
      progress: completedLessons.includes('2') ? 1.0 : (lessonProgress['2'] || 0),
      icon: ArrowRight,
      color: '#164c51',
    },
    {
      id: '3',
      title: 'Composting from Organic Waste',
      description: 'Making quality compost from kitchen waste',
      duration: '20 minutes',
      difficulty: 'Intermediate',
      points: 100,
      isCompleted: completedLessons.includes('3'),
      progress: completedLessons.includes('3') ? 1.0 : (lessonProgress['3'] || 0),
      icon: Star,
      color: '#D48931',
    },
    {
      id: '4',
      title: 'Creative Recycling',
      description: 'Transform waste into useful and valuable items',
      duration: '25 minutes',
      difficulty: 'Intermediate',
      points: 125,
      isCompleted: completedLessons.includes('4'),
      progress: completedLessons.includes('4') ? 1.0 : (lessonProgress['4'] || 0),
      icon: RotateCcw,
      color: '#6d1e04',
    },
    {
      id: '5',
      title: 'Zero Waste Lifestyle',
      description: 'Implementing a zero waste lifestyle in daily life',
      duration: '30 minutes',
      difficulty: 'Advanced',
      points: 150,
      isCompleted: completedLessons.includes('5'),
      progress: completedLessons.includes('5') ? 1.0 : (lessonProgress['5'] || 0),
      icon: Trophy,
      color: '#0C2521',
    },
  ];

  const lessons = getLessons();

  // Quiz questions for each lesson
  const quizQuestions = {
    '1': [
      {
        question: 'What does the 3R concept stand for in waste management?',
        options: [
          'Reduce, Reuse, Recycle',
          'Remove, Reduce, Recycle',
          'Reduce, Repair, Recycle',
          'Reuse, Repair, Remove',
        ],
        correctAnswer: 0,
      },
      {
        question: 'Which is the most effective way to reduce waste?',
        options: [
          'Recycling everything',
          'Reducing consumption',
          'Reusing items',
          'Buying more eco-friendly products',
        ],
        correctAnswer: 1,
      },
      {
        question: 'What is the correct order of the 3R hierarchy?',
        options: [
          'Recycle, Reduce, Reuse',
          'Reuse, Reduce, Recycle',
          'Reduce, Reuse, Recycle',
          'Reduce, Recycle, Reuse',
        ],
        correctAnswer: 2,
      },
    ],
    '2': [
      {
        question: 'Which of these items belongs to organic waste?',
        options: [
          'Plastic bottles',
          'Fruit peels',
          'Glass jars',
          'Metal cans',
        ],
        correctAnswer: 1,
      },
      {
        question: 'What color bin is typically used for recyclable waste?',
        options: [
          'Green',
          'Red',
          'Blue',
          'Yellow',
        ],
        correctAnswer: 2,
      },
      {
        question: 'Which waste should NOT be mixed with organic waste?',
        options: [
          'Vegetable scraps',
          'Coffee grounds',
          'Plastic packaging',
          'Eggshells',
        ],
        correctAnswer: 2,
      },
    ],
    '3': [
      {
        question: 'What is the ideal carbon to nitrogen ratio for composting?',
        options: [
          '10:1',
          '20:1',
          '30:1',
          '40:1',
        ],
        correctAnswer: 2,
      },
      {
        question: 'Which material provides "brown" carbon for composting?',
        options: [
          'Fresh grass clippings',
          'Kitchen scraps',
          'Dry leaves',
          'Coffee grounds',
        ],
        correctAnswer: 2,
      },
      {
        question: 'How often should you turn your compost pile?',
        options: [
          'Daily',
          'Weekly',
          'Every 2-3 weeks',
          'Monthly',
        ],
        correctAnswer: 2,
      },
    ],
    '4': [
      {
        question: 'What can plastic bottles be creatively recycled into?',
        options: [
          'Plant pots',
          'Bird feeders',
          'Storage containers',
          'All of the above',
        ],
        correctAnswer: 3,
      },
      {
        question: 'Which technique is best for upcycling old t-shirts?',
        options: [
          'Cutting into cleaning rags',
          'Making tote bags',
          'Creating braided rugs',
          'All of the above',
        ],
        correctAnswer: 3,
      },
      {
        question: 'What is the difference between recycling and upcycling?',
        options: [
          'No difference',
          'Upcycling creates higher-value products',
          'Recycling is more expensive',
          'Upcycling only works with plastic',
        ],
        correctAnswer: 1,
      },
    ],
    '5': [
      {
        question: 'What is the main goal of a zero waste lifestyle?',
        options: [
          'Recycling everything',
          'Sending nothing to landfill',
          'Buying only organic products',
          'Using only reusable items',
        ],
        correctAnswer: 1,
      },
      {
        question: 'Which is NOT a principle of zero waste living?',
        options: [
          'Refuse unnecessary items',
          'Reduce consumption',
          'Buy in bulk packaging',
          'Reuse everything possible',
        ],
        correctAnswer: 2,
      },
      {
        question: 'What percentage of waste reduction is considered "zero waste"?',
        options: [
          '80%',
          '90%',
          '95%',
          '100%',
        ],
        correctAnswer: 2,
      },
    ],
  };

  // Calculate stats
  const completedLessonsCount = lessons.filter(lesson => lesson.isCompleted).length;
  const totalPoints = lessons
    .filter(lesson => lesson.isCompleted)
    .reduce((sum, lesson) => sum + lesson.points, 0);

  const getUserLevel = (points) => {
    if (points >= 500) return 'Expert';
    if (points >= 300) return 'Advanced';
    if (points >= 150) return 'Intermediate';
    return 'Beginner';
  };

  // Notification Badge Component
  const NotificationBadge = ({ notification, onClose }) => {
    if (!notification) return null;

    const isSuccess = notification.type === 'success';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className={`absolute top-4 left-4 right-4 z-50 ${
          isSuccess ? 'bg-[#164c51]' : 'bg-[#D48931]'
        } text-white p-3 rounded-xl shadow-xl`}
        style={{ 
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          maxWidth: '320px',
          margin: '0 auto'
        }}
      >
        <div className="flex items-start">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
            isSuccess ? 'bg-white/20' : 'bg-white/20'
          }`}>
            {isSuccess ? (
              <CheckCircle size={12} />
            ) : (
              <AlertCircle size={12} />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-xs mb-1">{notification.title}</h3>
            <p className="text-xs text-white/90">{notification.message}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center ml-2"
          >
            <X size={10} />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#164c51';
      case 'Intermediate': return '#D48931';
      case 'Advanced': return '#6d1e04';
      default: return '#6B7280';
    }
  };

  const startQuiz = (lesson) => {
    setCurrentLesson(lesson);
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    const currentLessonQuestions = quizQuestions[currentLesson.id];
    if (selectedAnswer === currentLessonQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < currentLessonQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      const finalScore = score + (selectedAnswer === currentLessonQuestions[currentQuestionIndex].correctAnswer ? 1 : 0);
      const passingScore = Math.ceil(currentLessonQuestions.length * 0.7); // 70% to pass
      
      setShowQuiz(false);
      
      if (finalScore >= passingScore) {
        // Lesson completed successfully
        setCompletedLessons(prev => [...prev.filter(id => id !== currentLesson.id), currentLesson.id]);
        setLessonProgress(prev => ({ ...prev, [currentLesson.id]: 1.0 }));
        setShowLessonComplete(true);
      } else {
        // Failed, but update progress
        const progressPercent = finalScore / currentLessonQuestions.length;
        setLessonProgress(prev => ({ ...prev, [currentLesson.id]: progressPercent }));
        
        // Show in-app notification instead of alert
        setNotification({
          type: 'error',
          title: 'Quiz Failed',
          message: `You scored ${finalScore}/${currentLessonQuestions.length}. You need ${passingScore}/${currentLessonQuestions.length} to pass. Try again!`
        });
        
        // Auto hide notification after 5 seconds
        setTimeout(() => setNotification(null), 5000);
      }
    }
  };

  const showAnswerResult = () => {
    setShowResult(true);
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  // Stat Item Component
  const StatItem = ({ title, value, icon: Icon, color }) => (
    <div className="flex-1 text-center">
      <div className="flex flex-col items-center">
        <div 
          className="w-7 h-7 rounded-full flex items-center justify-center mb-1.5"
          style={{ backgroundColor: `${color}1A` }}
        >
          <Icon size={14} style={{ color }} />
        </div>
        <div className="text-base font-bold text-[#0C2521]">{value}</div>
        <div className="text-[10px] text-[#6B7280] leading-tight">{title}</div>
      </div>
    </div>
);

  // Lesson Card Component
  const LessonCard = ({ lesson, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-3 shadow-sm mb-3"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start">
        {/* Icon */}
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: `${lesson.color}1A` }}
        >
          <lesson.icon size={20} style={{ color: lesson.color }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1.5">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[#1F2937] leading-tight">
                {lesson.title}
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">
                {lesson.description}
              </p>
            </div>
            {lesson.isCompleted && (
              <CheckCircle size={18} className="text-[#10B981] ml-2 flex-shrink-0" />
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-2 mb-2.5 text-[10px] text-[#6B7280]">
            <div className="flex items-center">
              <Clock size={10} className="mr-1" />
              {lesson.duration}
            </div>
            <div 
              className="px-1.5 py-0.5 rounded-full text-[10px] font-medium"
              style={{ 
                backgroundColor: `${getDifficultyColor(lesson.difficulty)}1A`,
                color: getDifficultyColor(lesson.difficulty)
              }}
            >
              {lesson.difficulty}
            </div>
            <div className="flex items-center">
              <Star size={10} className="mr-1 text-[#F59E0B]" />
              {lesson.points} pts
            </div>
          </div>

          {/* Progress Bar */}
          {!lesson.isCompleted && lesson.progress > 0 && (
            <div className="mb-2.5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-[#6B7280]">Progress</span>
                <span className="text-[10px] font-medium text-[#1F2937]">
                  {Math.round(lesson.progress * 100)}%
                </span>
                </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <motion.div 
                  className="h-1 rounded-full"
                  style={{ backgroundColor: lesson.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${lesson.progress * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                />
                </div>
            </div>
          )}

          {/* Action Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => startQuiz(lesson)}
            className={clsx(
              "w-full py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5",
              lesson.isCompleted
                ? "bg-gray-100 text-[#6B7280]"
                : "bg-[#164c51] text-white shadow-lg shadow-[#164c51]/30"
            )}
          >
            {lesson.isCompleted ? (
              <>
                <RotateCcw size={14} />
                Repeat Lesson
              </>
            ) : lesson.progress > 0 ? (
              <>
                <Play size={14} />
                Continue Lesson
              </>
            ) : (
              <>
                <Play size={14} />
                Start Lesson
              </>
            )}
          </motion.button>
        </div>
        </div>
    </motion.div>
  );

  // Quiz Dialog Component
  const QuizDialog = () => {
    const currentLessonQuestions = quizQuestions[currentLesson.id];
    const question = currentLessonQuestions[currentQuestionIndex];
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-4 w-full mx-6"
          style={{ 
            maxWidth: '340px',
            maxHeight: '480px', 
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="text-center mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#6B7280]">{currentLesson.title}</span>
              <button
                onClick={() => setShowQuiz(false)}
                className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-sm"
              >
                ×
              </button>
            </div>
            <h3 className="text-[#10B981] font-semibold mb-2 text-sm">
              Question {currentQuestionIndex + 1}/{currentLessonQuestions.length}
            </h3>
            <h2 className="text-base font-semibold text-[#1F2937] leading-snug">
              {question.question}
            </h2>
          </div>

          <div className="space-y-2 mb-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                className={clsx(
                  "w-full p-3 rounded-lg text-left transition-all border-2 text-xs",
                  showResult
                    ? index === question.correctAnswer
                      ? "bg-[#10B981]/10 border-[#10B981] text-[#10B981]"
                      : selectedAnswer === index
                      ? "bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]"
                      : "bg-gray-50 border-gray-200 text-[#6B7280]"
                    : selectedAnswer === index
                    ? "bg-[#10B981]/10 border-[#10B981] text-[#10B981]"
                    : "bg-gray-50 border-gray-200 text-[#1F2937] hover:border-[#10B981]/50"
                )}
                disabled={showResult}
              >
                {option}
              </motion.button>
                ))}
            </div>

          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowQuiz(false)}
              className="flex-1 py-2.5 bg-gray-100 text-[#6B7280] rounded-lg font-semibold text-xs"
            >
              Cancel
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={showAnswerResult}
              disabled={selectedAnswer === null || showResult}
              className={clsx(
                "flex-1 py-2.5 rounded-lg font-semibold text-xs",
                selectedAnswer !== null && !showResult
                  ? "bg-[#164c51] text-white"
                  : "bg-gray-200 text-gray-400"
              )}
            >
              {showResult ? 'Next...' : 'Submit'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Lesson Complete Dialog Component
  const LessonCompleteDialog = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-4 w-full mx-8 text-center"
        style={{ 
          maxWidth: '280px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="w-12 h-12 bg-[#164c51]/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle size={24} className="text-[#164c51]" />
        </div>
        
        <h2 className="text-lg font-bold text-[#0C2521] mb-2">
          Lesson Completed!
        </h2>
        
        <p className="text-[#6B7280] text-xs mb-3 leading-relaxed">
          Congratulations! You've successfully completed "{currentLesson?.title}".
        </p>
        
        <div className="bg-[#164c51]/10 rounded-lg p-2.5 mb-4">
          <div className="flex items-center justify-center gap-1.5">
            <Star size={14} className="text-[#D48931]" />
            <span className="text-xs font-semibold text-[#0C2521]">
              +{currentLesson?.points} Points Earned
            </span>
          </div>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowLessonComplete(false)}
          className="w-full py-2.5 bg-[#164c51] text-white rounded-lg font-semibold text-xs"
        >
          Continue Learning
        </motion.button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="h-full bg-[#F8FAFC] flex flex-col relative">
      {/* In-App Notification */}
      <AnimatePresence>
        <NotificationBadge 
          notification={notification} 
          onClose={() => setNotification(null)} 
        />
      </AnimatePresence>

      {/* Header - exact Flutter recreation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 pt-12"
      >
        {/* App Logo */}
        <div className="mb-4">
          <AppLogo variant="compact" />
        </div>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-[#0C2521]"
        >
          Environmental Education
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#6B7280] text-sm mt-1"
        >
          Learn how to manage waste properly
        </motion.p>
      </motion.div>

      {/* Progress Overview - exact Flutter recreation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mb-4"
      >
        <div 
          className="bg-white rounded-2xl p-3 shadow-sm"
          style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center">
            <StatItem
              title="Lessons Completed"
              value={`${completedLessonsCount}/${lessons.length}`}
              icon={BookOpen}
              color="#164c51"
            />
            <div className="w-px h-8 bg-gray-200 mx-3" />
            <StatItem
              title="Total Points"
              value={totalPoints.toString()}
              icon={Star}
              color="#D48931"
            />
            <div className="w-px h-8 bg-gray-200 mx-3" />
            <StatItem
              title="Level"
              value={getUserLevel(totalPoints)}
              icon={Award}
              color="#6d1e04"
            />
            </div>
        </div>
      </motion.div>

      {/* Lessons List - exact Flutter recreation */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {lessons.map((lesson, index) => (
            <LessonCard key={lesson.id} lesson={lesson} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Quiz Dialog */}
      <AnimatePresence>
        {showQuiz && <QuizDialog />}
        {showLessonComplete && <LessonCompleteDialog />}
      </AnimatePresence>

      {/* Camera Floating Button */}
      <CameraFloatingButton />
        </div>
    );
};

export default EducationPage; 