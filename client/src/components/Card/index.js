import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { borderColor } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  card: {
    // maxWidth: 345,
    width: '240px',
    margin: '20px 0px',
    backgroundColor: '#a0f1ff'

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    borderColor: 'white',
    borderWidth: '2px',
    borderStyle: 'solid'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

export default function GeneralCard(props) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  function handleExpandClick() {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.card}>
      {/* <Link to={props.link}><CardHeader
    
        title={props.title}
      /> </Link> */}
      <Link to={props.link}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Paella dish"
        />
      </Link>
      <Link to={props.link}><CardHeader
    
        title={props.title}
      /> </Link>
      <CardContent>
        {/* <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography> */}
      </CardContent>
      <CardActions disableSpacing>
        {/* link to project/blank page */}
        {/* <Link to={props.link}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Link> */}

        {/* <IconButton aria-label="share">
        </IconButton> */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        </IconButton>
      </CardActions>
       
    </Card>
  )
}
