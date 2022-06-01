import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Image from 'next/image'

const src = 'https://images.unsplash.com/photo-1444065381814-865dc9da92c0'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  figure: {
    width: 600,
    backgroundRepeat: 'no-repeat',
    '&:hover': {
      '& img': {
        opacity: 0,
      },
    },
  },
  imageContainer: {
    width: 600,
    height: 600,
    pointerEvents: 'none',
    display: 'block',
  },
}))

const ImageMagnify = props => {
  const { media } = props
  const classes = useStyles()
  const [styleState, setStyleState] = useState({
    backgroundImage: `url(${media.original})`,
    backgroundPosition: '0% 0%',
  })

  const handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    setStyleState({
      backgroundImage: `url(${media.original})`,
      backgroundPosition: `${x}% ${y}%`,
    })
  }

  return (
    <div className={classes.root}>
      <figure className={classes.figure} onMouseMove={handleMouseMove} style={styleState}>
        <div className={classes.imageContainer}>
          <Image
            alt={'Product Image'}
            src={media.original}
            layout="fill"
            loading="lazy"
            objectFit="contain"
          />
        </div>
      </figure>
    </div>
  )
}

export default ImageMagnify
