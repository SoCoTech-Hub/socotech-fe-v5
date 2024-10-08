import React, { useState } from 'react'
import { NoSsr, Tab, Tabs } from '@mui/material'
import { useStyles, StyledTab, StyledTabs } from './style'

export default function LessonSelector({
	subjectCategories,
	setSubjectCategory,
	subjectCategory,
	setSubject
}) {
	const classes = useStyles()
	const [activeTab, setActiveTab] = useState(subjectCategory)

	const tabs = subjectCategories.map((category) => (
		<StyledTab
			label={category.name}
			className={classes.tabs}
			key={category.id}
			value={parseInt(category.id)}
		/>
	))

	const handleTabClick = (newValue) => {
		// Allow selecting an already selected tab
		setActiveTab(newValue)
		setSubjectCategory(newValue)
		setSubject(null)
	}

	const handleChange = (event, newValue) => {
		// Prevent re-selecting the same tab
		if (newValue !== activeTab) {
			setActiveTab(newValue)
			setSubjectCategory(newValue)
			setSubject(null)
		}
	}

	return (
		<div className={classes.root}>
			<div className={classes.demo2}>
				<NoSsr>
					<StyledTabs
						value={activeTab}
						onChange={handleChange}
						aria-label='subject categories'
					>
						{tabs.map((tab) => (
							<StyledTab
								key={tab.key}
								label={tab.props.label}
								value={tab.props.value}
								onClick={() => handleTabClick(tab.props.value)}
							/>
						))}
					</StyledTabs>
				</NoSsr>
			</div>
		</div>
	)
}
