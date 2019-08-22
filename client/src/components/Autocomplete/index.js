import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Downshift from 'downshift'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import Axios from 'axios'
import MaterialButton from '@material-ui/core/Button'
import Container from '../Container'
import { ClickAwayListener } from '@material-ui/core'

// npm install --save downshift
// npm install @material-ui/core
// npm install @material-ui/icons

const suggestions = []

const data = async () => {
  const response = await Axios.get('http://localhost:8001/users')
  let names = response.data.map(element => {
    const label = element.name
    // const obj = { label }
    suggestions.push({ label })
  })
  // console.log(suggestions)
  return names
}
data()



// get data from backend
// get value of input
// store inputted value in 

// find value 
let inputValue = ''

function handleChange(event) {
  console.log('clicking works')
  const { value } = event.target
  return inputValue = value
}

async function handleSubmit() {
  const response = await Axios.get('http://localhost:8001/users')
  const data = response.data
  const inputValue = 'James Kim'
  console.log(data)
  const name = data.map(element => {
    if (inputValue === element.name) return element.id
  })
  console.log(name[0])
  // console.log(inputValue)
}







function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      onChange={handleChange}
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  )
}

renderInput.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  InputProps: PropTypes.object
}

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.number
  ]).isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired
}

function getSuggestions(value, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue

        if (keep) {
          count += 1
        }

        return keep
      })
}

function DownshiftMultiple(props) {
  const { classes } = props
  const [inputValue, setInputValue] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState([])

  // function handleKeyDown(event) {
  //   if (
  //     selectedItem.length &&
  //     !inputValue.length &&
  //     event.key === 'Backspace'
  //   ) {
  //     setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
  //   }
  // }

  // function handleInputChange(event) {
  //   setInputValue(event.target.value)
  // }

  // function handleChange(item) {
  //   let newSelectedItem = [...selectedItem]
  //   if (newSelectedItem.indexOf(item) === -1) {
  //     newSelectedItem = [...newSelectedItem, item]
  //   }
  //   setInputValue('')
  //   setSelectedItem(newSelectedItem)
  // }

  // const handleDelete = item => () => {
  //   const newSelectedItem = [...selectedItem]
  //   newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
  //   setSelectedItem(newSelectedItem)
  // }

  return <div />
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  inputRoot: {
    flexWrap: 'wrap'
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1
  },
  divider: {
    height: theme.spacing(2)
  }
}))

let popperNode

export default function IntegrationDownshift(props) {
  const classes = useStyles()
  var names = props.names
  //   console.log(names)
  return (
    <div className={classes.root}>
      <Downshift id="downshift-simple">
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: 'Search for a user'
          })

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: 'Developer Name',
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onFocus },
                inputProps
              })}

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
              <MaterialButton
                variant="contained"
                onClick={handleSubmit}
                style={{ margin: `${20}px` }}
              >
                Search
              </MaterialButton>
            </div>
          )
        }}
      </Downshift>
      <div className={classes.divider} />
      <DownshiftMultiple classes={classes} />
      <div className={classes.divider} />

      <div className={classes.divider} />
      <Downshift id="downshift-options">
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          openMenu,
          selectedItem
        }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onChange: event => {
              if (event.target.value === '') {
                clearSelection()
              }
            },
            onFocus: openMenu,
            placeholder: 'Search by skill'
          })

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: 'Skills',
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onChange, onFocus },
                inputProps
              })}

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue, { showEmpty: true }).map(
                      (suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.label }),
                          highlightedIndex,
                          selectedItem
                        })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )
        }}
      </Downshift>
    </div>
  )
}
