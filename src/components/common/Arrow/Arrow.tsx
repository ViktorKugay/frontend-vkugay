import cn from 'classnames';
import Slider from 'react-slick';
import React, {MutableRefObject} from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

interface Props {
  slider: MutableRefObject<Slider>;
  mod: 'prev' | 'next';
  className?: string;
}

export const Arrow: React.FC<Props> = ({mod, className, slider}) => {
  const classNames = cn(className);

  const handleNext = () => {
    slider.current.slickNext();
  };

  const handlePrev = () => {
    slider.current.slickPrev();
  };

  switch (mod) {
    case 'prev': {
      return <ArrowBackIcon className={classNames} onClick={handlePrev} />;
    }

    case 'next': {
      return <ArrowForwardIcon className={classNames} onClick={handleNext} />;
    }

    default:
      return null;
  }
};
