function Alert(props) {
  return (
    <div
      className={`alert alert-${props.type} alert-dismissible fade show fixed-top shadow-sm mh-2`}
      role="alert"
    >
      {props.text}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default Alert;
