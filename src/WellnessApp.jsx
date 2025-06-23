import React, { useState } from 'react';
import { Heart, Share2, ArrowRight, RefreshCw, Sun, Cloud, Droplets, Leaf, Users, TrendingUp, MessageCircle, Sunrise } from 'lucide-react';

const WellnessApp = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const questions = [
    {
      id: 1,
      text: "오늘 하루 기분이 어떠세요?",
      emoji: "🌤️",
      options: [
        { text: "구름 사이로 스며드는 따스한 햇살 같아요", value: "optimistic", emoji: "☀️" },
        { text: "살짝 흐리지만 포근하고 평온해요", value: "calm", emoji: "☁️" },
        { text: "마음이 조금 복잡하고 어수선해요", value: "turbulent", emoji: "⛈️" },
        { text: "조용한 봄비처럼 차분하고 깨끗해요", value: "reflective", emoji: "🌧️" }
      ]
    },
    {
      id: 2,
      text: "힘든 일이 생겼을 때 나는 보통...",
      emoji: "🌊",
      options: [
        { text: "파도를 타듯 우아하게 헤쳐나가요", value: "resilient", emoji: "🏄‍♀️" },
        { text: "안전한 곳에서 잠시 쉬며 기다려요", value: "protective", emoji: "🏠" },
        { text: "폭풍 속에서도 춤을 춰요", value: "adventurous", emoji: "💃" },
        { text: "물처럼 자연스럽게 흘러가며 적응해요", value: "adaptive", emoji: "💧" }
      ]
    },
    {
      id: 3,
      text: "지금 내 에너지는 이런 느낌이에요...",
      emoji: "✨",
      options: [
        { text: "새벽 이슬처럼 싱그럽고 새로워요", value: "renewed", emoji: "🌱" },
        { text: "캠프파이어처럼 따뜻하고 든든해요", value: "stable", emoji: "🔥" },
        { text: "바닷물처럼 밀려왔다 빠져나가요", value: "dynamic", emoji: "🌊" },
        { text: "산들바람처럼 부드럽고 차분해요", value: "peaceful", emoji: "🍃" }
      ]
    },
    {
      id: 4,
      text: "지금 가장 필요한 것은...",
      emoji: "💫",
      options: [
        { text: "따뜻한 사람들과의 연결감이에요", value: "social", emoji: "🤗" },
        { text: "조용하고 평화로운 혼자만의 시간이에요", value: "solitude", emoji: "🧘‍♀️" },
        { text: "새롭고 흥미진진한 모험이에요", value: "stimulation", emoji: "🎨" },
        { text: "성장하고 배울 수 있는 기회예요", value: "development", emoji: "📚" }
      ]
    }
  ];

  const weatherTypes = {
    "봄비": {
      emoji: "🌧️💚",
      description: "지금 당신은 조용히 성찰하는 시간을 보내고 있어요. 새싹을 키우는 부드러운 봄비처럼, 자신을 돌보며 마음을 정리하기 좋은 때예요.",
      color: "from-green-200 to-blue-200",
      bgColor: "from-green-50 via-gray-50 to-green-100",
      icon: <Droplets className="w-10 h-10 text-green-600" />
    },
    "황금빛 새벽": {
      emoji: "🌅✨",
      description: "당신의 에너지가 밝고 희망차요! 새벽 첫 햇살처럼 따뜻한 마음으로 새로운 가능성들을 맞이할 준비가 되어 있어요.",
      color: "from-yellow-200 to-orange-200",
      bgColor: "from-yellow-50 via-orange-50 to-yellow-100",
      icon: <Sunrise className="w-10 h-10 text-yellow-500" />
    },
    "평온한 구름": {
      emoji: "☁️🕊️",
      description: "당신은 지금 평화롭고 안정된 상태예요. 고요한 하늘을 떠다니는 부드러운 구름처럼, 휴식과 사색을 위한 완벽한 시간이에요.",
      color: "from-blue-100 to-gray-100",
      bgColor: "from-blue-50 via-gray-50 to-blue-100",
      icon: <Cloud className="w-10 h-10 text-blue-400" />
    },
    "숲속 바람": {
      emoji: "🌿🍃",
      description: "당신은 지금 안정감을 느끼며 성장과 연결되어 있어요. 나무 사이를 지나는 상쾌한 바람처럼, 천천히 앞으로 나아갈 준비가 되어 있어요.",
      color: "from-green-100 to-teal-100",
      bgColor: "from-green-50 via-teal-50 to-green-100",
      icon: <Leaf className="w-10 h-10 text-green-600" />
    }
  };

  const calculateResult = () => {
    const traits = answers.map(answer => answer.value);
    
    // 각 타입별 점수 계산
    const scores = {
      '봄비': 0,
      '황금빛 새벽': 0,
      '평온한 구름': 0,
      '숲속 바람': 0
    };

    // 각 trait에 대해 점수 부여
    traits.forEach(trait => {
      switch(trait) {
        case 'reflective':
        case 'protective':
        case 'peaceful':
        case 'solitude':
          scores['봄비'] += 1;
          break;
        case 'optimistic':
        case 'resilient':
        case 'renewed':
        case 'stimulation':
          scores['황금빛 새벽'] += 1;
          break;
        case 'calm':
        case 'adaptive':
        case 'stable':
        case 'social':
          scores['평온한 구름'] += 1;
          break;
        case 'turbulent':
        case 'adventurous':
        case 'dynamic':
        case 'development':
          scores['숲속 바람'] += 1;
          break;
        default:
          // 기본적으로 숲속 바람에 할당
          scores['숲속 바람'] += 0.5;
      }
    });

    // 가장 높은 점수를 가진 타입 반환
    const maxScore = Math.max(...Object.values(scores));
    const resultTypes = Object.keys(scores).filter(type => scores[type] === maxScore);
    
    // 동점인 경우 첫 번째 타입 반환
    return resultTypes[0];
  };

  const handleAnswer = (option) => {
    setIsAnimating(true);
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const resultType = calculateResult();
        setResult(resultType);
        setCurrentScreen('result');
      }
      setIsAnimating(false);
    }, 300);
  };

  const resetApp = () => {
    setCurrentScreen('onboarding');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: `I'm a ${result} type! 💫`,
        text: `Just discovered my wellness type: ${result} ${weatherTypes[result].emoji}`,
        url: window.location.href
      });
    } else {
      const resultData = weatherTypes[result];
      navigator.clipboard.writeText(`저는 ${result} 타입이에요! ${resultData.emoji} ${resultData.description}`);
      alert('결과가 복사되었어요! 📋');
    }
  };

  const goToSocialScreen = () => {
    setCurrentScreen('social');
  };

  const joinCommunity = () => {
    alert('Connecting you to our supportive community 💙');
  };

  // Onboarding Screen
  if (currentScreen === 'onboarding') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Heart className="w-12 h-12 text-pink-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              마음날씨 ☁️
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed px-4">
              나를 위한 마음 체크인 시간이에요. <br />지금 내 마음의 날씨를 확인해보아요.
            </p>
          </div>
          
          <button
            onClick={() => setCurrentScreen('questions')}
            className="w-full bg-gradient-to-r from-pink-300 to-purple-300 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            체크 시작하기 ✨
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-6">
            약 2분 소요 • 완전히 비공개예요
          </p>
        </div>
      </div>
    );
  }

  // Questions Screen
  if (currentScreen === 'questions') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>{currentQuestion + 1}번째 질문 / 총 {questions.length}개</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className={`bg-white rounded-3xl p-6 shadow-lg mb-6 transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">{question.emoji}</div>
              <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
                {question.text}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all duration-200 transform hover:scale-102 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-gray-700 font-medium">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (currentScreen === 'result' && result) {
    const resultData = weatherTypes[result];
    
    return (
      <div className={`min-h-screen bg-gradient-to-br ${resultData.bgColor} p-4 flex items-center justify-center`}>
        <div className="max-w-md w-full">
          {/* Main Result Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center mb-6 border border-gray-100">
            {/* Icon Section */}
            <div className="mb-6">
              <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${resultData.color} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                <div className="relative">
                  {resultData.icon}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white bg-opacity-50 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 mb-2">
                {resultData.emoji.includes('🌅') ? (
                  <>
                    <span className="text-3xl">🌅</span>
                    <span className="text-3xl">✨</span>
                  </>
                ) : resultData.emoji.includes('🌧️') ? (
                  <>
                    <span className="text-3xl">🌧️</span>
                    <span className="text-3xl">💚</span>
                  </>
                ) : resultData.emoji.includes('☁️') ? (
                  <>
                    <span className="text-3xl">☁️</span>
                    <span className="text-3xl">🕊️</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">🌿</span>
                    <span className="text-3xl">🍃</span>
                  </>
                )}
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              당신은 {result} 타입이에요
            </h1>
            
            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6 px-2 text-base">
              {resultData.description}
            </p>

            {/* Social Stats */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700 font-medium">23%가 같은 타입</span>
                </div>
                <div className="w-1 h-4 bg-gray-300 rounded"></div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-medium">이번 달 +5%</span>
                </div>
              </div>
            </div>

            {/* Sharing Icons */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`저는 ${result} 타입이에요! ${resultData.emoji} ${resultData.description}`);
                  alert('결과가 복사되었어요! 📋');
                }}
                className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                title="결과 복사하기"
              >
                <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              
              <button
                onClick={() => alert('이미지로 저장 중... 📸')}
                className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                title="이미지로 저장"
              >
                <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              
              <button
                onClick={shareResult}
                className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                title="공유하기"
              >
                <Share2 className="w-7 h-7 text-blue-700" />
              </button>
            </div>

            {/* See More Button */}
            <button
              onClick={goToSocialScreen}
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 mb-4"
            >
              더 알아보기
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Take Again - Smaller */}
            <button
              onClick={resetApp}
              className="text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center justify-center gap-1 mx-auto transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              다시 해보기
            </button>
          </div>

          {/* Bottom Note */}
          <p className="text-center text-xs text-gray-400 px-4">
            마음의 날씨는 언제든 바뀔 수 있고, 그게 자연스러운 거예요 🌈
          </p>
        </div>
      </div>
    );
  }

  // Social Awareness Screen
  if (currentScreen === 'social') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
        <div className="max-w-md mx-auto">
          {/* Top Section - Empathy & Reassurance */}
          <div className="bg-gradient-to-br from-pink-50 p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-200 to-blue-200 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              혼자가 아니에요 🤝
            </h1>
            <p className="text-gray-600 text-base">
              많은 사람들이 비슷한 마음이에요
            </p>
          </div>

          {/* Middle Section - Social Reality Check */}
          <div className="p-4 space-y-4">
            {/* Bold Red Banner */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-2xl text-center shadow-lg">
              <h2 className="text-lg font-bold">
                2025년 취업, 정말 힘든게 맞아요 😮‍💨
              </h2>
            </div>

            {/* Statistics Infographic */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4 text-center">취업 현실 팩트체크</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-sm text-gray-700">청년 실업률</span>
                  <span className="font-bold text-red-600">8.2%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="text-sm text-gray-700">대졸자 취업률</span>
                  <span className="font-bold text-orange-600">63.4%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-sm text-gray-700">신입 채용 감소</span>
                  <span className="font-bold text-red-600">-34%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="text-sm text-gray-700">평균 취준 기간</span>
                  <span className="font-bold text-blue-600">14.7개월</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <span className="text-sm text-gray-700">월평균 취준 비용</span>
                  <span className="font-bold text-purple-600">127만원</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">이런 경험 있으신가요?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">100개 이상의 이력서를 넣었다</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">면접에서 "경험 부족"이라는 말을 들었다</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">경쟁 때문에 인턴십 기회를 놓쳤다</span>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-700 font-medium text-center">
                  시장이 어려운 거에요. 자책하지 마세요.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section - Collective Support */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 pb-8">
            {/* Real-time Stat */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Live</span>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  247,856명이 당신과 비슷한 상황을 지나가고 있어요.
                </p>
              </div>
            </div>

            {/* User Quote Bubbles */}
            <div className="space-y-3 mb-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center text-xs">👤</div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm flex-1">
                  <p className="text-sm text-gray-700">"8개월째 취업 준비 중이에요. 다른 분들의 이야기를 보니 덜 외로워져요."</p>
                  <span className="text-xs text-gray-400">— 소라, 24세</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-green-200 rounded-full flex items-center justify-center text-xs">👤</div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm flex-1">
                  <p className="text-sm text-gray-700">"다들 힘드니까... 저 혼자 힘든게 아니니까 견딜만해요."</p>
                  <span className="text-xs text-gray-400">— 민수, 26세</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={joinCommunity}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              나와 같은 사람들과 연결하기
            </button>
            
            <button
              onClick={resetApp}
              className="w-full mt-3 text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center justify-center gap-1 transition-colors duration-200"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              처음으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default WellnessApp;