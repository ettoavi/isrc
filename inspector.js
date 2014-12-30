/************************************************
* JavaScript Object Inspector
* By Muhammad Eko Avianto
* 2014
*/

function inspect(theObject,lnested) {
    var _dims = [];
    var cur_row = -1;
    _dims[0] = [];
    lnested = !lnested?false:true;

    function dInfo(num, col, count) {
        this.num = num;
        this.count = count;
        this.col = col;
        this.rowspan = 1;
        this.data = '&nbsp;';
        this.prop = '';
        this.parent = false;
        return this;
    }

    function findRoot(p, add) {
        if (typeof (p) == 'object') {
            p.rowspan += add;
            findRoot(p.parent, add);
        }
        return p;
    }
    try {
        function doInspect(obj, maxLevels, level, t_style, parent, parentInfo) {
            var type, msg, i,
                first = true,
                spc = '';
            var result = '';
            // if (typeof obj != "object") return "Invalid object";
            // if (typeof(parentInfo) == 'object') {cur_row = parentInfo.num - 1;findRoot(parentInfo,-1)}
            if (typeof result == "undefined") result = '';
            if (typeof (parent) !== 'string') parent = '';
            // Don't touch, we start iterating at level zero
            if (typeof (level) == 'undefined') level = 0;
            if (typeof (t_style) == 'undefined' || t_style == '') t_style = 'style="width:100%;padding:0px;margin:0;border:1px solid #000;font-family: Verdana, Tahoma, Arial, sans-serif;font-size:12px"';
            if (typeof (maxLevels) == 'undefined') maxLevels = 10;
            if (maxLevels < 1) return '<font color="red">Error: Levels number must be > 0</font>';
            // We start with a non null object
            if (obj == null) return '<font color="red">Error: Object <b>NULL</b></font>';
            // End Input Validations
            // Each Iteration must be indented
            result += '<table border="0" cellspacing="0" cellpadding="0" ' + t_style + '>';
            // Start iterations for all objects in obj
            var _count = 0;
            firstStart = true;
            var _odata;
            for (var _prop in obj) {
                try {
                    _count++;
                    cur_row++;
                    // Show "_prop" and "type _prop"
                    r_style = (first ? '' : 'border-top:1px solid #000;') + 'border-right:1px solid #000;';
                    var c_out = '';
                    var c_nested = '';
                    var type = typeof (obj[_prop]);
                    _dims[cur_row] = [];
                    if (typeof (parentInfo) == 'object') {
                        for (var ix = 0; ix < level; ix++) {
                            if (parentInfo.num == cur_row && parentInfo.col == ix) {
                                _dims[cur_row][ix] = parentInfo
                            }
                            else {
                                if (parentInfo.num != cur_row && typeof (_dims[cur_row][ix]) !== 'object') _dims[cur_row][ix] = 'sub'
                            }
                        }
                    }
                    findRoot(parentInfo, 1);
                    _dims[cur_row][level] = _odata = new dInfo(cur_row, level, _count);
                    _odata.prop = _prop;
                    if (typeof (parentInfo) == 'object') {
                        _odata.parent = parentInfo;
                        _odata.data = parentInfo.data + ((_prop !== ':') && (parentInfo.prop !== ':') ? '.' : '');
                    }
                    switch (type) {
                    case 'function':
                        var _fn = obj[_prop].toString();
                        var _c = '',
                            _a = _fn.indexOf("(");
                        var _b = _fn.indexOf(")");
                        _c = _fn.substr(_a + 1, _b - _a - 1);
                        _odata.data += '<span style="font-weight:bold;color:#660066;">' + _prop + '</span>' + ((obj[_prop] == null) ? (': <b>null</b>') : '') + '&nbsp;:&nbsp;function<span style="font-weight:bold;color:#000033;">(</span><span style="font-style:italic">' + _c + '</span><span style="font-weight:bold;color:#000033;">)</span>';
                        c_out += _odata.data;
                        break;
                    case 'string':
                        _odata.data += '<span style="font-weight:bold;color:#000033;">' + _prop + '</span>' + ((obj[_prop] == null) ? (': <b>null</b>') : '') + '&nbsp;:&nbsp;"' + obj[_prop] + '"';
                        c_out += _odata.data;
                        break;
                    case 'number':
                        _odata.data += '<span style="font-weight:bold;color:#993300;">' + _prop + '</span>' + ((obj[_prop] == null) ? (': <b>null</b>') : '') + '&nbsp;:&nbsp;' + obj[_prop];
                        c_out += _odata.data;
                        break;
                    case 'boolean':
                        _odata.data += '<span style="font-weight:bold;color:#666600;">' + _prop + '</span>' + ((obj[_prop] == null) ? (': <b>null</b>') : '') + '&nbsp;:&nbsp;' + obj[_prop];
                        c_out += _odata.data;
                        break;
                    case 'object':
                        var css = '',
                            xp;
                        _odata.data += xp = _prop;
                        if (level + 1 < maxLevels) {
                            //cur_row--;findRoot(parentInfo,-1);
                            var c_nested = doInspect(obj[_prop], maxLevels, level + 1, css, '', _odata);
                            //findRoot(parentInfo,-1);
                            if (c_nested != '') {
                                var csstd = level < 1 ? 'border-top:1px solid #000;border-bottom:1px solid #000;' : '';
                                //c_out += '<span style="font-weight:bold">'+_prop+'</span>'+'<td style="'+csstd+'padding:0px;text-align:left;width:100%" bgcolor="#99FF66">'+c_nested+'</td>';
                                c_out += _odata.data + ' ' + c_nested;
                            }
                            else {
                                c_out += _odata.data + ':{}';
                            }
                        }
                        //r_style ='';
                        break;
                    default:
                        c_out += _odata.data + 'unamed';
                    }
                    //if (type != 'object') c_out = JSON.stringify(_dims[cur_row]);
                    spc += c_out;
                    r_style = level > 1 ? 'border-right:1px solid #000;border-top:1px solid #000;border-bottom:0px solid #000;' : r_style;
                    c_tag = '<tr><td style="padding:4px;text-align:left;' + r_style + 'margin:0;width:100%;">';
                    result += c_tag + '<font color="grey">' + level + '</font>.<font color="red">' + _count + '</font><font color="grey">.</font> ' + parent + c_out + '</td></tr>';
                }
                catch (err) {
                    // Is there some properties in obj we can't access? Print it red.
                    if (typeof (err) == 'string') msg = err;
                    else if (err.message) msg = err.message;
                    else if (err.description) msg = err.description;
                    else msg = 'Unknown';
                    result += '<tr><td style="padding:4px;text-align:left;">' + cur_row + '.' + level + ' <font color="red">(Error) ' + _prop + ': ' + msg + '</font></td></tr>';
                }
                first = false;
            }
            result += '</table>';
            if (spc == '') result = '';
            return result;
        }

        var strtmp = doInspect(theObject);
        if (lnested) return strtmp;
 
        var n, m, ls, long = 0;
        $.each(_dims, function (i, v) {
            ls = v.length;
            if (ls > long) long = ls;
        });
        $.each(_dims, function (i, v) {
            for (m = _dims[i].length; m < long; m++) {
                if (_dims[i].length < long) _dims[i][m] = new dInfo();
            }
        });
        var so = '';
        $.each(_dims, function (i, v) {
            so += '<tr>';
            for (var n = 0; n < long; n++) {
                if (typeof (v[n]) == 'object') {
                    so += '<td' + (v[n].rowspan > 1 ? ' rowspan="' + (v[n].rowspan - 0) + '"' : '') + ' style="border:1px solid #000;">' + v[n].data + '</td>';
                }
            }
            so += '</tr>';
        });
        so = '<table border="0" cellspacing="0" cellpadding="0" style="width:100%;padding:0px;margin:0;border:1px solid #000;font-family: Verdana, Tahoma, Arial, sans-serif;font-size:12px">' + so + '</table>';
        return so;
    }
    catch (e) {
        alert(e)
		return 'error';
    }
}
