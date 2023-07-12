import classes from './Card.module.css';

const Card = (props) => {

  const additionalClassToAdd = props.additionalClass ? props.additionalClass : '';

  return (
    <section
      className={`${classes.card} ${additionalClassToAdd ? classes[additionalClassToAdd] : ''}`} // has to be in brackets to work
    >
      {props.children}
    </section>
  );
};

export default Card;