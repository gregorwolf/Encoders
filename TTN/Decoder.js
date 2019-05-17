function Decoder(bytes, port) {
  var ports = port;
  var msg = String.fromCharCode.apply(null, bytes);
  var bat = msg.substr(0, 4);
  var battery = (bat - 2000) / 16;
  var st = msg.substr(4, 1);
  var sta = dec_to_bho(st, 'B');
  var status = pad(sta, 2);
  var Tamper = status.substr(0, 1);
  var Valve = status.substr(1, 1);
  var conf_p = parseInt(msg.substr(6, 2), 16);
  var conf_s = msg.substr(8, 2);
  var unit1 = msg.substr(8, 2);
  var time1 = msg.substr(10, 2);
  var unit2 = msg.substr(12, 2);
  var time2 = msg.substr(14, 2);

  function pad(num, len) {
    return ("00" + num).substr(-len);
  }
  function dec_to_bho(n, base) {
    if (n < 0) {
      n = 0xFFFFFFFF + n + 1;
    }
    switch (base) {
      case 'B':
        return parseInt(n, 10).toString(2);
        break;
      case 'H':
        return parseInt(n, 10).toString(16);
        break;
      case 'O':
        return parseInt(n, 10).toString(8);
        break;
      default:
        return ("Wrong input.........");
    }
  }
  if (conf_p === 14 || conf_p === 15 || conf_p === 16 || conf_p === 17 || conf_p === 18 || conf_p === 19 || conf_p === 20) {
    return {
      Port: ports,
      Battery: battery,
      Valve: Valve,
      Tamper: Tamper,
      Status: status,
      Schl_Port: conf_p || 0,
      Schl_status: conf_s || 0,
    };
  }
  if (conf_p === 21) {
    return {
      Port: ports,
      Battery: battery,
      Valve: Valve,
      Tamper: Tamper,
      Status: status,
      Schl_status_Port: conf_p || 0,
      Schl_status_ack: conf_s || 0,
    };
  }
  else if (conf_p === 12 || conf_p === 13) {
    return {
      Port: ports,
      Battery: battery,
      Valve: Valve,
      Tamper: Tamper,
      Status: status,
      RTC_Port: conf_p || 0,
      RTC_status: conf_s || 0
    };
  }
  else {
    return {
      Port: ports,
      Battery: battery,
      Valve: Valve,
      Tamper: Tamper,
      Status: status,
    };
  }
}
