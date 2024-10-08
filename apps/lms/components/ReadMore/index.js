import React from "react"

const ReadMore = ({ children }) => {
  const text = children

  return (
		<>
			<div
				className='text-sm text-textColor'
				dangerouslySetInnerHTML={{ __html: text }}
			></div>
			{/* <p className="text">{isReadMore ? text.slice(0, 250) : text}</p>
      {text.length >= 150 ? (
        <button onClick={toggleReadMore} className="mt-4 read-or-hide">
          {isReadMore ? "Read more" : "Show less"}
        </button>
      ) : (
        <></>
      )} */}
		</>
	)
}

export default ReadMore
