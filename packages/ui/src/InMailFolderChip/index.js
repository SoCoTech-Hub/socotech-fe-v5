import React from 'react'
// import CloseIcon from "@mui/icons-material/Close";

const FolderChip = ({ label, color = 'bg-gray-300' }) => {
	return (
		<div
			className={`flex items-center p-2 ml-2 h-6 ${color} rounded-lg cursor-pointer`}
		>
			<div className='text-xs text-textColor'>{label}</div>
			{/* <CloseIcon className="w-4 ml-1" /> */}
		</div>
	)
}

export default FolderChip
