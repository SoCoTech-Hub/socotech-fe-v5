const PostImage = ({ mediaUrl, altText, isImage }) => {
  if (isImage) {
    return (
      <div>
        <div className=''>
          <img src={`${mediaUrl}`} alt={altText} />
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className=''>
        <video width='100%' height='240' controls autoPlay>
          <source src={mediaUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default PostImage
