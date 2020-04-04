exports.atRisk = ans => {
  if (ans.q4 === "y" || ans.q5 === "y") {
    return true;
  }
  return false;
};

exports.probable = ans => {
  console.log(ans);

  if (ans.q3 === "y") {
    return true;
  }
  if (ans.q1 === "y") {
    if (ans.q2 === "y") {
      return true;
    }
    if (ans.q6 === "y") {
      return true;
    }
  }
  if (ans.q6 === "y") {
    if (ans.q2 === "y") {
      return true;
    }
    if (ans.q3 === "y") {
      return true;
    }
  }
  if (ans.q7 === "y") {
    return true;
  }

  return false;
};
