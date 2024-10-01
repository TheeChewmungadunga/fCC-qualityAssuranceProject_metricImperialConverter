function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.match(/[.\d\/]+/g) || ["1"];
    result = result[0];
    if (result.includes('/')) {
      let numbers = result.split('/');
      if (numbers.length != 2) {
        return 'invalid number';
      }
      result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    }
    if (isNaN(result)) {
      return 'invalid number';
    }
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+/g);
    if (result) {
      result = result[0].toLowerCase();
      const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      if (validUnits.includes(result)) {
        return result === 'l' ? 'L' : result;
      }
    }
    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellOutMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellOutMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
