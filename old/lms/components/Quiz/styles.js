import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  quizNav: {
    '& .MuiIconButton-root': {
      flex: '0 0 auto',
      backgroundColor: '#62213B',
      padding: '10px',
      overflow: 'visible',
      borderRadius: '50%',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#B69862',
      },
    },
  },
  criterionWrapper: {
    '& img': {
      maxHeight: '100%',
      height: 70,
    },
  },
}))
export default useStyles
