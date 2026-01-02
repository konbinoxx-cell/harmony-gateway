// 诗班专用训练界面
const ChoirTraining = () => {
  return (
    <div className="choir-training">
      {/* 1. 声部选择 */}
      <VoicePartSelector 
        parts={['Soprano', 'Alto', 'Tenor', 'Bass']}
      />
      
      {/* 2. 歌曲选择（赞美诗库） */}
      <HymnSelector 
        hymns={hymnLibrary}
        onSelect={(hymn) => startPractice(hymn)}
      />
      
      {/* 3. 练习模式 */}
      <PracticeMode 
        mode="choir"  // 诗班模式
        difficulty="beginner"
      />
      
      {/* 4. 录音分享 */}
      <RecordingShare 
        onRecordComplete={(audio) => saveRecording(audio)}
      />
    </div>
  )
}