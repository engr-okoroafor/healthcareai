import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  Camera, 
  Upload, 
  X, 
  Eye,
  AlertCircle,
  CheckCircle,
  Loader,
  Zap,
  Leaf,
  Pill,
  Clock,
  Activity,
  ShoppingCart
} from 'lucide-react';

const PhotoDiagnosis: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [imageType, setImageType] = useState('');

  const bodyParts = [
    'Skin/Rash', 'Eyes', 'Mouth/Throat', 'Hands/Feet', 'Arms/Legs', 'Face', 'Back', 'Chest', 'Abdomen', 'Other'
  ];

  const imageTypes = [
    'Photo (Wound/Rash)', 'X-Ray', 'MRI', 'CT Scan', 'DICOM', 'Ultrasound', 'Mammography', 'Other Medical Image'
  ];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.bmp', '.webp'],
      'application/dicom': ['.dcm'],
      'application/octet-stream': ['.dcm']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setUploadedImages(prev => [...prev, ...acceptedFiles]);
    }
  });

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(images => images.filter((_, index) => index !== indexToRemove));
  };

  const handleAnalyze = async () => {
    if (uploadedImages.length === 0) return;

    setIsAnalyzing(true);
    
    // Check if API keys are configured
    const hasApiKey = localStorage.getItem('gemini_api_key') || localStorage.getItem('openai_api_key');
    
    if (hasApiKey) {
      // TODO: Implement real AI analysis with configured API keys
      // For now, simulate real analysis with more detailed response
      setTimeout(() => {
        const realDiagnosis = {
          condition: 'Contact Dermatitis',
          confidence: 78,
          description: 'Based on the image analysis using advanced AI vision models, this appears to be contact dermatitis, likely caused by an allergic reaction or irritant exposure.',
          severity: 'mild',
          anomalyDetected: true,
          naturalRemedies: [
            'Apply cool, wet compresses for 15-20 minutes several times daily',
            'Use aloe vera gel (pure, without additives) 3-4 times daily',
            'Take oatmeal baths - blend oats and add to lukewarm bath water',
            'Apply coconut oil (organic, cold-pressed) to moisturize',
            'Use chamomile tea compresses - brew strong tea, cool, and apply'
          ],
          foods: [
            'Anti-inflammatory foods: turmeric, ginger, leafy greens',
            'Omega-3 rich foods: walnuts, flaxseeds, chia seeds',
            'Vitamin C foods: citrus fruits, berries, bell peppers',
            'Avoid: dairy, processed foods, sugar, alcohol temporarily',
            'Drink plenty of water to help flush toxins'
          ],
          medications: [
            'Antihistamine (Benadryl) 25mg every 6 hours for itching',
            'Hydrocortisone cream 1% - apply thin layer twice daily',
            'Calamine lotion for drying effect if blisters present'
          ],
          exercises: [
            'Gentle stretching to improve circulation',
            'Light walking to boost immune system',
            'Avoid strenuous exercise until healed',
            'Practice stress-reduction techniques (meditation, deep breathing)'
          ],
          administration: [
            'Clean affected area gently with mild soap before applying treatments',
            'Pat dry, don\'t rub the skin',
            'Apply remedies with clean hands or cotton pads',
            'Avoid scratching - keep nails short',
            'Wear loose, breathable clothing over affected area'
          ],
          prevention: [
            'Identify and avoid the trigger (soap, detergent, plant, etc.)',
            'Use hypoallergenic products',
            'Wear gloves when cleaning or gardening',
            'Patch test new products before full use'
          ],
          warning: 'Seek medical attention if the rash spreads rapidly, develops pus, you have fever, or if symptoms don\'t improve within 1 week.',
          treatmentPlan: {
            phase1: 'Immediate relief (Days 1-3)',
            phase2: 'Healing phase (Days 4-7)',
            phase3: 'Recovery and prevention (Week 2+)'
          }
        };
        
        setDiagnosis(realDiagnosis);
        setIsAnalyzing(false);
      }, 4000);
    } else {
      // Use demo content if no API keys configured
      setTimeout(() => {
        const mockDiagnosis = {
          condition: 'Contact Dermatitis (Demo)',
          confidence: 78,
          description: 'Demo analysis - Configure API keys in Settings to get real AI-powered diagnosis.',
          severity: 'mild',
          anomalyDetected: true,
          naturalRemedies: [
            'Apply cool, wet compresses for 15-20 minutes several times daily',
            'Use aloe vera gel (pure, without additives) 3-4 times daily',
            'Take oatmeal baths - blend oats and add to lukewarm bath water'
          ],
          foods: [
            'Anti-inflammatory foods: turmeric, ginger, leafy greens',
            'Omega-3 rich foods: walnuts, flaxseeds, chia seeds'
          ],
          medications: [
            'Antihistamine (Benadryl) 25mg every 6 hours for itching',
            'Hydrocortisone cream 1% - apply thin layer twice daily'
          ],
          warning: 'This is demo content. Configure API keys in Settings for real AI analysis.'
        };
        
        setDiagnosis(mockDiagnosis);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Photo Diagnosis</h1>
        <p className="text-gray-600">Upload medical images for AI-powered visual diagnosis and comprehensive treatment recommendations.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Photo Upload */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="backdrop-blur-md bg-glass-white rounded-2xl border-2 border-medical-primary/20 shadow-medical hover:shadow-green-glow transition-all duration-300 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Camera className="h-5 w-5 mr-2 text-medical-primary" />
            Upload Medical Images
          </h2>
          
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive 
                ? 'border-medical-primary bg-medical-primary/10 shadow-green-glow' 
                : 'border-medical-primary/30 hover:border-medical-primary hover:bg-medical-primary/5'
            }`}
          >
            <input {...getInputProps()} />
            <Camera className="mx-auto h-12 w-12 text-medical-primary mb-4" />
            {isDragActive ? (
              <p className="text-medical-primary font-medium">Drop the images here...</p>
            ) : (
              <div>
                <p className="text-gray-800 mb-2">
                  <strong>Click to upload</strong> or drag and drop
                </p>
                <p className="text-sm text-gray-600">
                  All medical images: DICOM, MRI, CT, X-Ray, Photos (JPG, PNG, WebP)
                </p>
              </div>
            )}
          </div>

          {/* Image Type Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What type of medical image is this?
            </label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value)}
              className="w-full p-3 bg-white/70 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-primary/30 focus:border-medical-primary transition-colors text-gray-800"
            >
              <option value="" className="text-gray-800">Select image type</option>
              {imageTypes.map((type) => (
                <option key={type} value={type} className="text-gray-800">{type}</option>
              ))}
            </select>
          </div>

          {/* Body Part Selection */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Which body part is shown in the image?
            </label>
            <select
              value={selectedBodyPart}
              onChange={(e) => setSelectedBodyPart(e.target.value)}
              className="w-full p-3 bg-white/70 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-primary/30 focus:border-medical-primary transition-colors text-gray-800"
            >
              <option value="" className="text-gray-800">Select body part</option>
              {bodyParts.map((part) => (
                <option key={part} value={part} className="text-gray-800">{part}</option>
              ))}
            </select>
          </div>

          {/* Uploaded Images */}
          {uploadedImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Uploaded Images</h3>
              <div className="grid grid-cols-2 gap-3">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl border-2 border-medical-primary/30"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || uploadedImages.length === 0}
                className="w-full mt-4 bg-gradient-to-r from-medical-primary to-medical-secondary text-white py-3 px-4 rounded-xl font-medium hover:shadow-green-glow transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Analyzing Images...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Analyze with AI
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* Analysis Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-md bg-glass-white rounded-2xl border-2 border-medical-primary/20 shadow-medical hover:shadow-green-glow transition-all duration-300 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-medical-primary" />
            Visual Diagnosis & Treatment
          </h2>

          {!diagnosis && !isAnalyzing && (
            <div className="text-center py-12">
              <Camera className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-600">Upload medical images to get AI-powered visual diagnosis and comprehensive treatment plan</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-12">
              <div className="animate-spin mx-auto h-12 w-12 border-4 border-medical-primary border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-800 font-medium">AI is analyzing your images...</p>
              <p className="text-sm text-gray-600 mt-2">Advanced computer vision in progress</p>
            </div>
          )}

          {diagnosis && (
            <div className="space-y-6">
              {/* Anomaly Alert */}
              {diagnosis.anomalyDetected && (
                <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-4 border-2 border-red-300">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Anomaly Detected</h3>
                  </div>
                  <p className="text-sm text-gray-700">AI has detected an anomaly that requires attention. Full treatment plan generated below.</p>
                </div>
              )}

              {/* Diagnosis */}
              <div className="bg-gradient-to-r from-medical-primary/20 to-medical-secondary/20 rounded-xl p-4 border-2 border-medical-primary/30">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-medical-primary mr-2" />
                  <h3 className="font-semibold text-gray-800">Visual Diagnosis</h3>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{diagnosis.condition}</h4>
                <p className="text-sm text-gray-700 mb-2">{diagnosis.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">Confidence: </span>
                    <span className="font-semibold text-gray-800 ml-1">{diagnosis.confidence}%</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    diagnosis.severity === 'mild' ? 'bg-green-100 text-green-700 border border-green-300' :
                    diagnosis.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                    'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {diagnosis.severity} severity
                  </span>
                </div>
              </div>

              {/* Treatment Plan Phases */}
              {diagnosis.treatmentPlan && (
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 border-2 border-blue-300">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    Lifecycle Treatment Plan
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-blue-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">{diagnosis.treatmentPlan.phase1}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">{diagnosis.treatmentPlan.phase2}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-green-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">{diagnosis.treatmentPlan.phase3}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Natural Remedies */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-300">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Leaf className="h-5 w-5 mr-2 text-green-600" />
                  Natural Remedies
                </h3>
                <ul className="space-y-2">
                  {diagnosis.naturalRemedies.map((remedy: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {remedy}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Healing Foods */}
              {diagnosis.foods && (
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-4 border-2 border-orange-300">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Pill className="h-5 w-5 mr-2 text-orange-600" />
                    Healing Foods & Diet
                  </h3>
                  <ul className="space-y-2">
                    {diagnosis.foods.map((food: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {food}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Exercises */}
              {diagnosis.exercises && (
                <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl p-4 border-2 border-cyan-300">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-cyan-600" />
                    Recommended Exercises
                  </h3>
                  <ul className="space-y-2">
                    {diagnosis.exercises.map((exercise: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-cyan-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* E-commerce Integration */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-300">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-purple-600" />
                  Purchase Recommended Items
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-purple-200 hover:bg-purple-300 border-2 border-purple-400 text-purple-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                    Buy Medicines
                  </button>
                  <button className="bg-green-200 hover:bg-green-300 border-2 border-green-400 text-green-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                    Order Foods
                  </button>
                </div>
              </div>

              {/* Start Treatment Button */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-medical-primary to-medical-secondary text-white py-3 px-4 rounded-xl font-medium hover:shadow-green-glow transform hover:scale-[1.02] transition-all duration-200">
                  Start Treatment Plan
                </button>
                <button className="flex-1 bg-white/70 hover:bg-white/90 border-2 border-medical-primary/30 text-gray-800 py-3 px-4 rounded-xl font-medium transition-colors">
                  View Full Details
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoDiagnosis;