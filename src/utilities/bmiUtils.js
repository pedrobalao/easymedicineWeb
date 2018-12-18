const translateToPT = (enStr) => {
  if (enStr === 'underweight') {
    return 'Abaixo do peso'
  } else if (enStr === 'healthy weight') {
    return 'Peso saudável'
  } else if (enStr === 'overweight') {
    return 'Acima do peso'
  } else if (enStr === 'obesity') {
    return 'Obesidade'
  }
}

const translateToVariant = (enStr) => {
  if (enStr === 'underweight') {
    return 'warning'
  } else if (enStr === 'healthy weight') {
    return 'success'
  } else if (enStr === 'overweight') {
    return 'warning'
  } else if (enStr === 'obesity') {
    return 'danger'
  }
}

export default {
  translateToPT,
  translateToVariant
}
