(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.dw.bB === region.dZ.bB)
	{
		return 'on line ' + region.dw.bB;
	}
	return 'on lines ' + region.dw.bB + ' through ' + region.dZ.bB;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fi,
		impl.fZ,
		impl.fR,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		au: func(record.au),
		dy: record.dy,
		dh: record.dh
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.au;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.dy;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.dh) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fi,
		impl.fZ,
		impl.fR,
		function(sendToApp, initialModel) {
			var view = impl.f0;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fi,
		impl.fZ,
		impl.fR,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.dp && impl.dp(sendToApp)
			var view = impl.f0;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.e_);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.H) && (_VirtualDom_doc.title = title = doc.H);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.fB;
	var onUrlRequest = impl.fC;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		dp: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.ey === next.ey
							&& curr.d3 === next.d3
							&& curr.eu.a === next.eu.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		fi: function(flags)
		{
			return A3(impl.fi, flags, _Browser_getUrl(), key);
		},
		f0: impl.f0,
		fZ: impl.fZ,
		fR: impl.fR
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { fg: 'hidden', e1: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { fg: 'mozHidden', e1: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { fg: 'msHidden', e1: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { fg: 'webkitHidden', e1: 'webkitvisibilitychange' }
		: { fg: 'hidden', e1: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		eG: _Browser_getScene(),
		eS: {
			dG: _Browser_window.pageXOffset,
			dJ: _Browser_window.pageYOffset,
			aB: _Browser_doc.documentElement.clientWidth,
			as: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		aB: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		as: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			eG: {
				aB: node.scrollWidth,
				as: node.scrollHeight
			},
			eS: {
				dG: node.scrollLeft,
				dJ: node.scrollTop,
				aB: node.clientWidth,
				as: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			eG: _Browser_getScene(),
			eS: {
				dG: x,
				dJ: y,
				aB: _Browser_doc.documentElement.clientWidth,
				as: _Browser_doc.documentElement.clientHeight
			},
			fb: {
				dG: x + rect.left,
				dJ: y + rect.top,
				aB: rect.width,
				as: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = 2;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.p) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.s),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.s);
		} else {
			var treeLen = builder.p * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.w) : builder.w;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.p);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.s) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.s);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{w: nodeList, p: (len / $elm$core$Array$branchFactor) | 0, s: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {d2: fragment, d3: host, es: path, eu: port_, ey: protocol, ez: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$initialModel = {bS: 'area', bD: 560};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$ResizedTo = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Main$containerWidth = _Platform_incomingPort('containerWidth', $elm$json$Json$Decode$int);
var $author$project$Main$subscriptions = function (_v0) {
	return $author$project$Main$containerWidth($author$project$Main$ResizedTo);
};
var $author$project$Main$update = F2(
	function (msg, model) {
		if (!msg.$) {
			var id = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{bS: id}),
				$elm$core$Platform$Cmd$none);
		} else {
			var w = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						bD: A2($elm$core$Basics$max, 200, w - 48)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$html$Html$a = _VirtualDom_node('a');
var $author$project$Main$boxData = _List_fromArray(
	[
		{o: 'Jan', ca: 78, cb: 42, cd: 12, cj: 28, ck: 58},
		{o: 'Feb', ca: 82, cb: 47, cd: 18, cj: 32, ck: 63},
		{o: 'Mar', ca: 88, cb: 50, cd: 15, cj: 35, ck: 68},
		{o: 'Apr', ca: 90, cb: 55, cd: 22, cj: 40, ck: 72}
	]);
var $author$project$Main$cpuData = A2(
	$elm$core$List$indexedMap,
	F2(
		function (i, v) {
			return _Utils_Tuple2(i, v);
		}),
	_List_fromArray(
		[42, 55, 48, 72, 63, 58, 70, 65, 80, 73, 68, 75]));
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Main$donutSlices = _List_fromArray(
	[
		{o: 'Running', az: 42},
		{o: 'Stopped', az: 8},
		{o: 'Pending', az: 5},
		{o: 'Failed', az: 3}
	]);
var $author$project$PF6$Charts$Area$AreaChart = $elm$core$Basics$identity;
var $author$project$PF6$Charts$Theme$Theme = $elm$core$Basics$identity;
var $author$project$PF6$Charts$Colors$axisLine = '#c7c7c7';
var $author$project$PF6$Charts$Colors$background = '#ffffff';
var $author$project$PF6$Charts$Colors$gridLine = '#c7c7c7';
var $author$project$PF6$Charts$Colors$labelText = '#383838';
var $author$project$PF6$Charts$Colors$blue300 = '#0066cc';
var $author$project$PF6$Charts$Colors$blue500 = '#003366';
var $author$project$PF6$Charts$Colors$gold400 = '#f0ab00';
var $author$project$PF6$Charts$Colors$gold500 = '#c58c00';
var $author$project$PF6$Charts$Colors$green300 = '#4cb140';
var $author$project$PF6$Charts$Colors$green500 = '#23511e';
var $author$project$PF6$Charts$Colors$orange300 = '#ec7a08';
var $author$project$PF6$Charts$Colors$orange500 = '#8f4700';
var $author$project$PF6$Charts$Colors$teal300 = '#009596';
var $author$project$PF6$Charts$Colors$teal500 = '#003737';
var $author$project$PF6$Charts$Colors$multiOrdered = _List_fromArray(
	[$author$project$PF6$Charts$Colors$blue300, $author$project$PF6$Charts$Colors$green300, $author$project$PF6$Charts$Colors$teal300, $author$project$PF6$Charts$Colors$gold400, $author$project$PF6$Charts$Colors$orange300, $author$project$PF6$Charts$Colors$blue500, $author$project$PF6$Charts$Colors$green500, $author$project$PF6$Charts$Colors$teal500, $author$project$PF6$Charts$Colors$gold500, $author$project$PF6$Charts$Colors$orange500]);
var $author$project$PF6$Charts$Colors$primary = '#0066cc';
var $author$project$PF6$Charts$Theme$light = {bj: $author$project$PF6$Charts$Colors$axisLine, aF: $author$project$PF6$Charts$Colors$background, bw: 'Red Hat Text, RedHatText, sans-serif', by: $author$project$PF6$Charts$Colors$gridLine, o: $author$project$PF6$Charts$Colors$labelText, aj: $author$project$PF6$Charts$Colors$primary, a4: $author$project$PF6$Charts$Colors$multiOrdered};
var $author$project$PF6$Charts$Area$defaultConfig = function (data) {
	return {aU: $author$project$PF6$Charts$Colors$primary, b0: data, b3: 0.15, as: 250, b8: false, aO: $author$project$PF6$Charts$Theme$light, H: '', cp: false, aB: 500, be: '', bg: ''};
};
var $author$project$PF6$Charts$Area$fromData = function (data) {
	return $author$project$PF6$Charts$Area$defaultConfig(data);
};
var $author$project$PF6$Charts$Bar$BarChart = $elm$core$Basics$identity;
var $author$project$PF6$Charts$Bar$defaultConfig = F2(
	function (categories, series) {
		return {bm: categories, bX: $author$project$PF6$Charts$Colors$multiOrdered, cG: true, as: 300, b8: false, a4: series, aO: $author$project$PF6$Charts$Theme$light, H: '', cp: false, aB: 500, be: '', bg: ''};
	});
var $author$project$PF6$Charts$Bar$fromData = F2(
	function (categories, series) {
		return A2($author$project$PF6$Charts$Bar$defaultConfig, categories, series);
	});
var $author$project$PF6$Charts$BoxPlot$BoxPlotChart = $elm$core$Basics$identity;
var $author$project$PF6$Charts$BoxPlot$defaultConfig = function (data) {
	return {b0: data, as: 300, b8: false, aO: $author$project$PF6$Charts$Theme$light, H: '', aB: 500, be: '', bg: ''};
};
var $author$project$PF6$Charts$BoxPlot$fromData = function (data) {
	return $author$project$PF6$Charts$BoxPlot$defaultConfig(data);
};
var $author$project$PF6$Charts$Bullet$BulletChart = $elm$core$Basics$identity;
var $author$project$PF6$Charts$Bullet$defaultConfig = F3(
	function (actual, target, max) {
		return {cv: actual, as: 120, b8: false, ca: max, eM: '', fT: target, aO: $author$project$PF6$Charts$Theme$light, H: '', cs: '', aB: 450};
	});
var $author$project$PF6$Charts$Bullet$fromData = F3(
	function (actual, target, max) {
		return A3($author$project$PF6$Charts$Bullet$defaultConfig, actual, target, max);
	});
var $author$project$PF6$Charts$Donut$DonutChart = $elm$core$Basics$identity;
var $author$project$PF6$Charts$Donut$defaultConfig = function (data) {
	return {bn: '', bo: '', bX: $author$project$PF6$Charts$Colors$multiOrdered, b0: data, b8: false, bF: 230, aO: $author$project$PF6$Charts$Theme$light, H: '', cp: false};
};
var $author$project$PF6$Charts$Donut$fromData = function (slices) {
	return $author$project$PF6$Charts$Donut$defaultConfig(slices);
};
var $author$project$PF6$Charts$DonutUtilization$DonutUtilization = $elm$core$Basics$identity;
var $author$project$PF6$Charts$DonutUtilization$defaultConfig = F2(
	function (used, total) {
		return {b$: 90, b8: false, bF: 230, aO: $author$project$PF6$Charts$Theme$light, H: '', bO: total, cs: '', ct: used, cu: 75};
	});
var $author$project$PF6$Charts$DonutUtilization$fromData = F2(
	function (used, total) {
		return A2($author$project$PF6$Charts$DonutUtilization$defaultConfig, used, total);
	});
var $author$project$PF6$Charts$Pie$PieChart = $elm$core$Basics$identity;
var $author$project$PF6$Charts$Pie$defaultConfig = function (data) {
	return {bX: $author$project$PF6$Charts$Colors$multiOrdered, b0: data, b8: false, bF: 230, aO: $author$project$PF6$Charts$Theme$light, H: '', cp: false};
};
var $author$project$PF6$Charts$Pie$fromData = function (slices) {
	return $author$project$PF6$Charts$Pie$defaultConfig(slices);
};
var $author$project$PF6$Charts$Sparkline$Sparkline = $elm$core$Basics$identity;
var $author$project$PF6$Charts$Sparkline$defaultConfig = function (data) {
	return {aU: $author$project$PF6$Charts$Colors$primary, b0: data, b2: true, as: 40, b8: false, aO: $author$project$PF6$Charts$Theme$light, aB: 150};
};
var $author$project$PF6$Charts$Sparkline$fromData = function (data) {
	return $author$project$PF6$Charts$Sparkline$defaultConfig(data);
};
var $author$project$PF6$Charts$Threshold$ThresholdChart = $elm$core$Basics$identity;
var $author$project$PF6$Charts$Threshold$defaultConfig = function (data) {
	return {aU: $author$project$PF6$Charts$Colors$primary, b0: data, b3: 0.15, as: 250, b8: false, aO: $author$project$PF6$Charts$Theme$light, aP: _List_Nil, H: '', aB: 500, be: '', bg: ''};
};
var $author$project$PF6$Charts$Threshold$fromData = function (data) {
	return $author$project$PF6$Charts$Threshold$defaultConfig(data);
};
var $author$project$PF6$Charts$Line$LineChart = $elm$core$Basics$identity;
var $author$project$PF6$Charts$Line$defaultConfig = function (series) {
	return {as: 250, b8: false, a4: series, aO: $author$project$PF6$Charts$Theme$light, H: '', aB: 500, be: '', bg: ''};
};
var $author$project$PF6$Charts$Line$fromSeries = function (series) {
	return $author$project$PF6$Charts$Line$defaultConfig(series);
};
var $author$project$PF6$Charts$Scatter$ScatterChart = $elm$core$Basics$identity;
var $author$project$PF6$Charts$Scatter$defaultConfig = function (series) {
	return {as: 300, b8: false, ci: 5, a4: series, aO: $author$project$PF6$Charts$Theme$light, H: '', cp: false, aB: 500, be: '', bg: ''};
};
var $author$project$PF6$Charts$Scatter$fromSeries = function (series) {
	return $author$project$PF6$Charts$Scatter$defaultConfig(series);
};
var $author$project$PF6$Charts$Stack$StackChart = $elm$core$Basics$identity;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$PF6$Charts$Stack$defaultConfig = function (series) {
	var n = A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$core$Maybe$map,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.bR;
				},
				$elm$core$List$length),
			$elm$core$List$head(series)));
	return {
		as: 250,
		b8: false,
		a4: series,
		aO: $author$project$PF6$Charts$Theme$light,
		H: '',
		aB: 500,
		be: '',
		bf: A2(
			$elm$core$List$map,
			$elm$core$Basics$toFloat,
			A2($elm$core$List$range, 0, n - 1)),
		bg: ''
	};
};
var $author$project$PF6$Charts$Stack$fromSeries = function (series) {
	return $author$project$PF6$Charts$Stack$defaultConfig(series);
};
var $author$project$Main$memoryCategories = _List_fromArray(
	['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5']);
var $author$project$Main$memoryData = _List_fromArray(
	[
		{
		o: 'Used (GiB)',
		bR: _List_fromArray(
			[12.4, 18.7, 8.2, 15.1, 22.0])
	},
		{
		o: 'Cached (GiB)',
		bR: _List_fromArray(
			[4.2, 6.1, 3.5, 5.8, 7.3])
	}
	]);
var $author$project$Main$networkSeriesData = _List_fromArray(
	[
		{
		b0: A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, v) {
					return _Utils_Tuple2(i, v);
				}),
			_List_fromArray(
				[10, 25, 18, 42, 35, 28, 45, 38, 52, 44, 36, 50])),
		o: 'Inbound'
	},
		{
		b0: A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, v) {
					return _Utils_Tuple2(i, v);
				}),
			_List_fromArray(
				[8, 20, 14, 30, 25, 20, 32, 27, 40, 34, 28, 38])),
		o: 'Outbound'
	}
	]);
var $author$project$Main$pieSlices = _List_fromArray(
	[
		{o: 'US East', az: 35},
		{o: 'US West', az: 28},
		{o: 'EU', az: 22},
		{o: 'APAC', az: 15}
	]);
var $author$project$Main$scatterSeriesData = _List_fromArray(
	[
		{
		b0: _List_fromArray(
			[
				_Utils_Tuple2(10, 22),
				_Utils_Tuple2(15, 35),
				_Utils_Tuple2(20, 28),
				_Utils_Tuple2(25, 42),
				_Utils_Tuple2(30, 38),
				_Utils_Tuple2(35, 55),
				_Utils_Tuple2(40, 48),
				_Utils_Tuple2(45, 65),
				_Utils_Tuple2(50, 58),
				_Utils_Tuple2(55, 72)
			]),
		o: 'Cluster A'
	},
		{
		b0: _List_fromArray(
			[
				_Utils_Tuple2(12, 8),
				_Utils_Tuple2(18, 15),
				_Utils_Tuple2(22, 12),
				_Utils_Tuple2(28, 20),
				_Utils_Tuple2(32, 18),
				_Utils_Tuple2(38, 25),
				_Utils_Tuple2(42, 22),
				_Utils_Tuple2(48, 30),
				_Utils_Tuple2(52, 28),
				_Utils_Tuple2(58, 35)
			]),
		o: 'Cluster B'
	}
	]);
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$Main$sparklineValues = _List_fromArray(
	[42, 55, 48, 72, 63, 58, 70, 65, 80, 73, 68, 75]);
var $author$project$Main$stackSeriesData = _List_fromArray(
	[
		{
		o: 'Project A',
		bR: _List_fromArray(
			[10, 14, 18, 22, 20, 25, 28, 24])
	},
		{
		o: 'Project B',
		bR: _List_fromArray(
			[8, 10, 12, 15, 13, 16, 18, 15])
	},
		{
		o: 'Project C',
		bR: _List_fromArray(
			[5, 7, 9, 11, 10, 12, 14, 12])
	}
	]);
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$thresholdData = A2(
	$elm$core$List$indexedMap,
	F2(
		function (i, v) {
			return _Utils_Tuple2(i, v);
		}),
	_List_fromArray(
		[35, 42, 55, 68, 58, 72, 80, 75, 88, 82, 78, 90]));
var $folkertdev$one_true_path_experiment$SubPath$SubPath = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$one_true_path_experiment$SubPath$firstPoint = function (_v0) {
	var moveto = _v0.fv;
	var p = moveto;
	return p;
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$lineTo = $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo;
var $folkertdev$one_true_path_experiment$SubPath$Empty = {$: 1};
var $folkertdev$one_true_path_experiment$SubPath$map2 = F3(
	function (f, sub1, sub2) {
		var _v0 = _Utils_Tuple2(sub1, sub2);
		if (_v0.a.$ === 1) {
			if (_v0.b.$ === 1) {
				var _v1 = _v0.a;
				var _v2 = _v0.b;
				return $folkertdev$one_true_path_experiment$SubPath$Empty;
			} else {
				var _v3 = _v0.a;
				var subpath = _v0.b;
				return subpath;
			}
		} else {
			if (_v0.b.$ === 1) {
				var subpath = _v0.a;
				var _v4 = _v0.b;
				return subpath;
			} else {
				var a = _v0.a.a;
				var b = _v0.b.a;
				return A2(f, a, b);
			}
		}
	});
var $folkertdev$elm_deque$Deque$Deque = $elm$core$Basics$identity;
var $folkertdev$elm_deque$Deque$mapAbstract = F2(
	function (f, _v0) {
		var _abstract = _v0;
		return f(_abstract);
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $folkertdev$elm_deque$Internal$rebalance = function (deque) {
	var sizeF = deque.M;
	var sizeR = deque.N;
	var front = deque.S;
	var rear = deque.T;
	var size1 = ((sizeF + sizeR) / 2) | 0;
	var size2 = (sizeF + sizeR) - size1;
	var balanceConstant = 4;
	if ((sizeF + sizeR) < 2) {
		return deque;
	} else {
		if (_Utils_cmp(sizeF, (balanceConstant * sizeR) + 1) > 0) {
			var newRear = _Utils_ap(
				rear,
				$elm$core$List$reverse(
					A2($elm$core$List$drop, size1, front)));
			var newFront = A2($elm$core$List$take, size1, front);
			return {S: newFront, T: newRear, M: size1, N: size2};
		} else {
			if (_Utils_cmp(sizeR, (balanceConstant * sizeF) + 1) > 0) {
				var newRear = A2($elm$core$List$take, size1, rear);
				var newFront = _Utils_ap(
					front,
					$elm$core$List$reverse(
						A2($elm$core$List$drop, size1, rear)));
				return {S: newFront, T: newRear, M: size1, N: size2};
			} else {
				return deque;
			}
		}
	}
};
var $folkertdev$elm_deque$Deque$pushBack = F2(
	function (elem, _v0) {
		var deque = _v0;
		return A2(
			$folkertdev$elm_deque$Deque$mapAbstract,
			$folkertdev$elm_deque$Internal$rebalance,
			{
				S: deque.S,
				T: A2($elm$core$List$cons, elem, deque.T),
				M: deque.M,
				N: deque.N + 1
			});
	});
var $folkertdev$one_true_path_experiment$SubPath$pushBack = F2(
	function (drawto, data) {
		return _Utils_update(
			data,
			{
				fa: A2($folkertdev$elm_deque$Deque$pushBack, drawto, data.fa)
			});
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $folkertdev$elm_deque$Internal$length = function (deque) {
	return deque.M + deque.N;
};
var $folkertdev$elm_deque$Internal$isEmpty = function (deque) {
	return !$folkertdev$elm_deque$Internal$length(deque);
};
var $folkertdev$elm_deque$Deque$unwrap = function (_v0) {
	var boundedDeque = _v0;
	return boundedDeque;
};
var $folkertdev$elm_deque$Deque$isEmpty = A2($elm$core$Basics$composeL, $folkertdev$elm_deque$Internal$isEmpty, $folkertdev$elm_deque$Deque$unwrap);
var $folkertdev$elm_deque$Deque$append = F2(
	function (p, q) {
		var x = p;
		var y = q;
		return $folkertdev$elm_deque$Deque$isEmpty(p) ? q : ($folkertdev$elm_deque$Deque$isEmpty(q) ? p : {
			S: _Utils_ap(
				x.S,
				$elm$core$List$reverse(x.T)),
			T: $elm$core$List$reverse(
				_Utils_ap(
					y.S,
					$elm$core$List$reverse(y.T))),
			M: x.M + x.N,
			N: y.M + y.N
		});
	});
var $folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate = F2(
	function (a, b) {
		return _Utils_update(
			a,
			{
				fa: A2($folkertdev$elm_deque$Deque$append, a.fa, b.fa)
			});
	});
var $folkertdev$one_true_path_experiment$SubPath$connect = function () {
	var helper = F2(
		function (right, left) {
			return $folkertdev$one_true_path_experiment$SubPath$SubPath(
				A2(
					$folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate,
					A2(
						$folkertdev$one_true_path_experiment$SubPath$pushBack,
						$folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(
							_List_fromArray(
								[
									$folkertdev$one_true_path_experiment$SubPath$firstPoint(right)
								])),
						left),
					right));
		});
	return $folkertdev$one_true_path_experiment$SubPath$map2(helper);
}();
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Shape$Generators$area = F2(
	function (curve, data) {
		var makeShape = F2(
			function (topline, bottomline) {
				return A2(
					$folkertdev$one_true_path_experiment$SubPath$connect,
					curve(bottomline),
					curve(topline));
			});
		var makeCurves = F3(
			function (acc, datum, _v3) {
				var prev = _v3.a;
				var list = _v3.b;
				var _v0 = _Utils_Tuple3(prev, datum, list);
				if (_v0.b.$ === 1) {
					var _v1 = _v0.b;
					var l = _v0.c;
					return _Utils_Tuple2(false, l);
				} else {
					if (!_v0.a) {
						var point = _v0.b.a;
						var l = _v0.c;
						return _Utils_Tuple2(
							true,
							A2(
								$elm$core$List$cons,
								_List_fromArray(
									[
										acc(point)
									]),
								l));
					} else {
						if (_v0.c.b) {
							var p1 = _v0.b.a;
							var _v2 = _v0.c;
							var ps = _v2.a;
							var l = _v2.b;
							return _Utils_Tuple2(
								true,
								A2(
									$elm$core$List$cons,
									A2(
										$elm$core$List$cons,
										acc(p1),
										ps),
									l));
						} else {
							var p1 = _v0.b.a;
							var l = _v0.c;
							return _Utils_Tuple2(
								true,
								A2(
									$elm$core$List$cons,
									_List_fromArray(
										[
											acc(p1)
										]),
									l));
						}
					}
				}
			});
		var topLineData = A3(
			$elm$core$List$foldr,
			makeCurves($elm$core$Tuple$first),
			_Utils_Tuple2(false, _List_Nil),
			data).b;
		var bottomLineData = A2(
			$elm$core$List$map,
			$elm$core$List$reverse,
			A3(
				$elm$core$List$foldr,
				makeCurves($elm$core$Tuple$second),
				_Utils_Tuple2(false, _List_Nil),
				data).b);
		return A3($elm$core$List$map2, makeShape, topLineData, bottomLineData);
	});
var $author$project$Shape$area = $author$project$Shape$Generators$area;
var $author$project$PF6$Charts$Theme$axisColor = function (_v0) {
	var c = _v0;
	return c.bj;
};
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $author$project$Scale$tickFormat = function (_v0) {
	var opts = _v0;
	return opts.dz(opts.D);
};
var $author$project$Scale$ticks = F2(
	function (_v0, count) {
		var scale = _v0;
		return A2(scale.dA, scale.D, count);
	});
var $author$project$Axis$computeOptions = F2(
	function (attrs, scale) {
		var _v0 = A3(
			$elm$core$List$foldl,
			F2(
				function (attr, _v1) {
					var babyOpts = _v1.a;
					var post = _v1.b;
					switch (attr.$) {
						case 2:
							var val = attr.a;
							return _Utils_Tuple2(
								_Utils_update(
									babyOpts,
									{a8: val}),
								post);
						case 3:
							var val = attr.a;
							return _Utils_Tuple2(
								_Utils_update(
									babyOpts,
									{a9: val}),
								post);
						case 4:
							var val = attr.a;
							return _Utils_Tuple2(
								_Utils_update(
									babyOpts,
									{ax: val}),
								post);
						case 5:
							var val = attr.a;
							return _Utils_Tuple2(
								_Utils_update(
									babyOpts,
									{bH: val}),
								post);
						default:
							return _Utils_Tuple2(
								babyOpts,
								A2($elm$core$List$cons, attr, post));
					}
				}),
			_Utils_Tuple2(
				{a8: 10, bH: 3, a9: 6, ax: 6},
				_List_Nil),
			attrs);
		var opts = _v0.a;
		var postList = _v0.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (attr, options) {
					switch (attr.$) {
						case 0:
							var val = attr.a;
							return _Utils_update(
								options,
								{dA: val});
						case 1:
							var val = attr.a;
							return _Utils_update(
								options,
								{dz: val});
						default:
							return options;
					}
				}),
			{
				a8: opts.a8,
				dz: A2($author$project$Scale$tickFormat, scale, opts.a8),
				bH: opts.bH,
				a9: opts.a9,
				ax: opts.ax,
				dA: A2($author$project$Scale$ticks, scale, opts.a8)
			},
			postList);
	});
var $author$project$Scale$convert = F2(
	function (_v0, value) {
		var scale = _v0;
		return A3(scale.ag, scale.D, scale.W, value);
	});
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$dy = _VirtualDom_attribute('dy');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$fontFamily = _VirtualDom_attribute('font-family');
var $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $author$project$Scale$rangeExtent = function (_v0) {
	var options = _v0;
	return A2(options.di, options.D, options.W);
};
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $author$project$Axis$element = F4(
	function (_v0, k, displacement, textAnchorPosition) {
		var x = _v0.dG;
		var y = _v0.dJ;
		var x2 = _v0.dH;
		var y1 = _v0.dK;
		var y2 = _v0.dL;
		var translate = _v0.dB;
		var horizontal = _v0.cH;
		return F2(
			function (attrs, scale) {
				var rangeExtent = $author$project$Scale$rangeExtent(scale);
				var range1 = rangeExtent.b + 0.5;
				var range0 = rangeExtent.a + 0.5;
				var position = $author$project$Scale$convert(scale);
				var opts = A2($author$project$Axis$computeOptions, attrs, scale);
				var spacing = A2($elm$core$Basics$max, opts.a9, 0) + opts.bH;
				var drawTick = function (tick) {
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$class('tick'),
								$elm$svg$Svg$Attributes$transform(
								translate(
									position(tick)))
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$line,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$stroke('#000'),
										x2(k * opts.a9),
										y1(0.5),
										y2(0.5)
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$fill('#000'),
										x(k * spacing),
										y(0.5),
										$elm$svg$Svg$Attributes$dy(displacement)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(
										opts.dz(tick))
									]))
							]));
				};
				var domainLine = horizontal ? ('M' + ($elm$core$String$fromFloat(k * opts.ax) + (',' + ($elm$core$String$fromFloat(range0) + ('H0.5V' + ($elm$core$String$fromFloat(range1) + ('H' + $elm$core$String$fromFloat(k * opts.ax)))))))) : ('M' + ($elm$core$String$fromFloat(range0) + (',' + ($elm$core$String$fromFloat(k * opts.ax) + ('V0.5H' + ($elm$core$String$fromFloat(range1) + ('V' + $elm$core$String$fromFloat(k * opts.ax))))))));
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$fill('none'),
							$elm$svg$Svg$Attributes$fontSize('10'),
							$elm$svg$Svg$Attributes$fontFamily('sans-serif'),
							$elm$svg$Svg$Attributes$textAnchor(textAnchorPosition)
						]),
					A2(
						$elm$core$List$cons,
						A2(
							$elm$svg$Svg$path,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('domain'),
									$elm$svg$Svg$Attributes$stroke('#000'),
									$elm$svg$Svg$Attributes$d(domainLine)
								]),
							_List_Nil),
						A2($elm$core$List$map, drawTick, opts.dA)));
			});
	});
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $author$project$Axis$verticalAttrs = {
	cH: false,
	dB: function (x) {
		return 'translate(' + ($elm$core$String$fromFloat(x) + ', 0)');
	},
	dG: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y, $elm$core$String$fromFloat),
	eV: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y1, $elm$core$String$fromFloat),
	dH: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y2, $elm$core$String$fromFloat),
	dJ: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x, $elm$core$String$fromFloat),
	dK: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x1, $elm$core$String$fromFloat),
	dL: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x2, $elm$core$String$fromFloat)
};
var $author$project$Axis$bottom = A4($author$project$Axis$element, $author$project$Axis$verticalAttrs, 1, '0.71em', 'middle');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $folkertdev$elm_deque$Internal$empty = {S: _List_Nil, T: _List_Nil, M: 0, N: 0};
var $folkertdev$elm_deque$Deque$empty = $folkertdev$elm_deque$Internal$empty;
var $folkertdev$elm_deque$Internal$fromList = function (list) {
	return $folkertdev$elm_deque$Internal$rebalance(
		{
			S: list,
			T: _List_Nil,
			M: $elm$core$List$length(list),
			N: 0
		});
};
var $folkertdev$elm_deque$Deque$fromList = A2($elm$core$Basics$composeL, $elm$core$Basics$identity, $folkertdev$elm_deque$Internal$fromList);
var $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath = {$: 4};
var $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc = function (a) {
	return {$: 3, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo = function (a) {
	return {$: 2, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$merge = F2(
	function (instruction1, instruction2) {
		var _v0 = _Utils_Tuple2(instruction1, instruction2);
		_v0$5:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					if (!_v0.b.$) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$LineTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 1:
					if (_v0.b.$ === 1) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 2:
					if (_v0.b.$ === 2) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 3:
					if (_v0.b.$ === 3) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				default:
					if (_v0.b.$ === 4) {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return $elm$core$Result$Ok($folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath);
					} else {
						break _v0$5;
					}
			}
		}
		return $elm$core$Result$Err(
			_Utils_Tuple2(instruction1, instruction2));
	});
var $folkertdev$elm_deque$Internal$toList = function (deque) {
	return _Utils_ap(
		deque.S,
		$elm$core$List$reverse(deque.T));
};
var $folkertdev$elm_deque$Deque$toList = A2($elm$core$Basics$composeL, $folkertdev$elm_deque$Internal$toList, $folkertdev$elm_deque$Deque$unwrap);
var $folkertdev$one_true_path_experiment$SubPath$compressHelper = function (drawtos) {
	var folder = F2(
		function (instruction, _v3) {
			var previous = _v3.a;
			var accum = _v3.b;
			var _v2 = A2($folkertdev$one_true_path_experiment$LowLevel$Command$merge, previous, instruction);
			if (!_v2.$) {
				var merged = _v2.a;
				return _Utils_Tuple2(merged, accum);
			} else {
				return _Utils_Tuple2(
					instruction,
					A2($elm$core$List$cons, previous, accum));
			}
		});
	var _v0 = $folkertdev$elm_deque$Deque$toList(drawtos);
	if (!_v0.b) {
		return $folkertdev$elm_deque$Deque$empty;
	} else {
		var first = _v0.a;
		var rest = _v0.b;
		return $folkertdev$elm_deque$Deque$fromList(
			$elm$core$List$reverse(
				function (_v1) {
					var a = _v1.a;
					var b = _v1.b;
					return A2($elm$core$List$cons, a, b);
				}(
					A3(
						$elm$core$List$foldl,
						folder,
						_Utils_Tuple2(first, _List_Nil),
						rest))));
	}
};
var $folkertdev$one_true_path_experiment$SubPath$compress = function (subpath) {
	if (subpath.$ === 1) {
		return $folkertdev$one_true_path_experiment$SubPath$Empty;
	} else {
		var data = subpath.a;
		return $folkertdev$one_true_path_experiment$SubPath$SubPath(
			_Utils_update(
				data,
				{
					fa: $folkertdev$one_true_path_experiment$SubPath$compressHelper(data.fa)
				}));
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$DecimalPlaces = $elm$core$Basics$identity;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces = $elm$core$Basics$identity;
var $folkertdev$one_true_path_experiment$SubPath$defaultConfig = {b1: $elm$core$Maybe$Nothing, cc: false};
var $folkertdev$one_true_path_experiment$SubPath$optionFolder = F2(
	function (option, config) {
		if (!option.$) {
			var n = option.a;
			return _Utils_update(
				config,
				{
					b1: $elm$core$Maybe$Just(n)
				});
		} else {
			return _Utils_update(
				config,
				{cc: true});
		}
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute = 1;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath = {$: 8};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo = function (drawto) {
	switch (drawto.$) {
		case 0:
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo, 1, coordinates);
		case 1:
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo, 1, coordinates);
		case 2:
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo, 1, coordinates);
		case 3:
			var _arguments = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc, 1, _arguments);
		default:
			return $folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath;
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo = function (_v0) {
	var target = _v0;
	return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo, 1, target);
};
var $folkertdev$one_true_path_experiment$SubPath$toLowLevel = function (subpath) {
	if (subpath.$ === 1) {
		return $elm$core$Maybe$Nothing;
	} else {
		var moveto = subpath.a.fv;
		var drawtos = subpath.a.fa;
		return $elm$core$Maybe$Just(
			{
				fa: A2(
					$elm$core$List$map,
					$folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo,
					$folkertdev$elm_deque$Deque$toList(drawtos)),
				fv: $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo(moveto)
			});
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig = {bv: $elm$core$String$fromFloat};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Basics$pow = _Basics_pow;
var $elm$core$Basics$round = _Basics_round;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo = F2(
	function (n, value) {
		if (!n) {
			return $elm$core$String$fromInt(
				$elm$core$Basics$round(value));
		} else {
			var sign = (value < 0.0) ? '-' : '';
			var exp = A2($elm$core$Basics$pow, 10, n);
			var raised = $elm$core$Basics$abs(
				$elm$core$Basics$round(value * exp));
			var decimals = raised % exp;
			return (!decimals) ? _Utils_ap(
				sign,
				$elm$core$String$fromInt((raised / exp) | 0)) : (sign + ($elm$core$String$fromInt((raised / exp) | 0) + ('.' + $elm$core$String$fromInt(decimals))));
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder = F2(
	function (option, config) {
		var n = option;
		return _Utils_update(
			config,
			{
				bv: $folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo(n)
			});
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions = A2($elm$core$List$foldl, $folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder, $folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig);
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty = function (command) {
	switch (command.$) {
		case 0:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 1:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 2:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 3:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 4:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 5:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 6:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 7:
			var mode = command.a;
			var _arguments = command.b;
			return $elm$core$List$isEmpty(_arguments);
		default:
			return false;
	}
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Char$toLower = _Char_toLower;
var $elm$core$Char$toUpper = _Char_toUpper;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter = F2(
	function (mode, character) {
		if (mode === 1) {
			return $elm$core$String$fromChar(
				$elm$core$Char$toUpper(character));
		} else {
			return $elm$core$String$fromChar(
				$elm$core$Char$toLower(character));
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate = F2(
	function (config, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return config.bv(x) + (',' + config.bv(y));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2 = F2(
	function (config, _v0) {
		var c1 = _v0.a;
		var c2 = _v0.b;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3 = F2(
	function (config, _v0) {
		var c1 = _v0.a;
		var c2 = _v0.b;
		var c3 = _v0.c;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + (A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2) + (' ' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c3))));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags = function (_v0) {
	var arcFlag = _v0.a;
	var direction = _v0.b;
	var _v1 = _Utils_Tuple2(arcFlag, direction);
	if (_v1.a === 1) {
		if (!_v1.b) {
			var _v2 = _v1.a;
			var _v3 = _v1.b;
			return _Utils_Tuple2(1, 0);
		} else {
			var _v6 = _v1.a;
			var _v7 = _v1.b;
			return _Utils_Tuple2(1, 1);
		}
	} else {
		if (!_v1.b) {
			var _v4 = _v1.a;
			var _v5 = _v1.b;
			return _Utils_Tuple2(0, 0);
		} else {
			var _v8 = _v1.a;
			var _v9 = _v1.b;
			return _Utils_Tuple2(0, 1);
		}
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument = F2(
	function (config, _v0) {
		var radii = _v0.fH;
		var xAxisRotate = _v0.dI;
		var arcFlag = _v0.cw;
		var direction = _v0.cC;
		var target = _v0.fT;
		var _v1 = $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags(
			_Utils_Tuple2(arcFlag, direction));
		var arc = _v1.a;
		var sweep = _v1.b;
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, radii),
					$elm$core$String$fromFloat(xAxisRotate),
					$elm$core$String$fromInt(arc),
					$elm$core$String$fromInt(sweep),
					A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, target)
				]));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo = F2(
	function (config, command) {
		if ($folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty(command)) {
			return '';
		} else {
			switch (command.$) {
				case 0:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'L'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
								coordinates)));
				case 1:
					var mode = command.a;
					var coordinates = command.b;
					return $elm$core$List$isEmpty(coordinates) ? '' : _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'H'),
						A2(
							$elm$core$String$join,
							' ',
							A2($elm$core$List$map, $elm$core$String$fromFloat, coordinates)));
				case 2:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'V'),
						A2(
							$elm$core$String$join,
							' ',
							A2($elm$core$List$map, $elm$core$String$fromFloat, coordinates)));
				case 3:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'C'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3(config),
								coordinates)));
				case 4:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'S'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
								coordinates)));
				case 5:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'Q'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
								coordinates)));
				case 6:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'T'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
								coordinates)));
				case 7:
					var mode = command.a;
					var _arguments = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'A'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument(config),
								_arguments)));
				default:
					return 'Z';
			}
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo = F2(
	function (config, _v0) {
		var mode = _v0.a;
		var coordinate = _v0.b;
		if (mode === 1) {
			return 'M' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
		} else {
			return 'm' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath = F2(
	function (config, _v0) {
		var moveto = _v0.fv;
		var drawtos = _v0.fa;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo, config, moveto) + (' ' + A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo(config),
				drawtos)));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith = F2(
	function (options, subpaths) {
		var config = $folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions(options);
		return A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath(config),
				subpaths));
	});
var $folkertdev$one_true_path_experiment$SubPath$toStringWith = F2(
	function (options, subpath) {
		var config = A3($elm$core$List$foldl, $folkertdev$one_true_path_experiment$SubPath$optionFolder, $folkertdev$one_true_path_experiment$SubPath$defaultConfig, options);
		var lowLevelOptions = function () {
			var _v0 = config.b1;
			if (_v0.$ === 1) {
				return _List_Nil;
			} else {
				var n = _v0.a;
				return _List_fromArray(
					[
						$folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces(n)
					]);
			}
		}();
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeL,
					$folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith(lowLevelOptions),
					$elm$core$List$singleton),
				$folkertdev$one_true_path_experiment$SubPath$toLowLevel(
					(config.cc ? $folkertdev$one_true_path_experiment$SubPath$compress : $elm$core$Basics$identity)(subpath))));
	});
var $folkertdev$one_true_path_experiment$SubPath$toString = function (subpath) {
	return A2($folkertdev$one_true_path_experiment$SubPath$toStringWith, _List_Nil, subpath);
};
var $folkertdev$one_true_path_experiment$Path$toString = A2(
	$elm$core$Basics$composeL,
	$elm$core$String$join(' '),
	$elm$core$List$map($folkertdev$one_true_path_experiment$SubPath$toString));
var $folkertdev$one_true_path_experiment$Path$element = F2(
	function (path, attributes) {
		return A2(
			$elm$svg$Svg$path,
			A2(
				$elm$core$List$cons,
				$elm$svg$Svg$Attributes$d(
					$folkertdev$one_true_path_experiment$Path$toString(path)),
				attributes),
			_List_Nil);
	});
var $author$project$PF6$Charts$Theme$fontFamily = function (_v0) {
	var c = _v0;
	return c.bw;
};
var $elm$svg$Svg$Attributes$fontWeight = _VirtualDom_attribute('font-weight');
var $author$project$PF6$Charts$Theme$gridColor = function (_v0) {
	var c = _v0;
	return c.by;
};
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $author$project$PF6$Charts$Internal$Color$hexToRgba = F2(
	function (hex, opacity) {
		var hexDigit = function (c) {
			return ((c >= '0') && (c <= '9')) ? ($elm$core$Char$toCode(c) - $elm$core$Char$toCode('0')) : (((c >= 'a') && (c <= 'f')) ? (($elm$core$Char$toCode(c) - $elm$core$Char$toCode('a')) + 10) : (((c >= 'A') && (c <= 'F')) ? (($elm$core$Char$toCode(c) - $elm$core$Char$toCode('A')) + 10) : 0));
		};
		var parseByte = function (s) {
			var _v0 = $elm$core$String$toList(s);
			if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
				var hi = _v0.a;
				var _v1 = _v0.b;
				var lo = _v1.a;
				return (hexDigit(hi) * 16) + hexDigit(lo);
			} else {
				return 0;
			}
		};
		var h = A2($elm$core$String$startsWith, '#', hex) ? A2($elm$core$String$dropLeft, 1, hex) : hex;
		var rStr = A2($elm$core$String$left, 2, h);
		var r = parseByte(rStr);
		var gStr = A3($elm$core$String$slice, 2, 4, h);
		var g = parseByte(gStr);
		var bStr = A3($elm$core$String$slice, 4, 6, h);
		var b = parseByte(bStr);
		var alphaStr = $elm$core$String$fromFloat(
			$elm$core$Basics$round(opacity * 100) / 100);
		return 'rgba(' + ($elm$core$String$fromInt(r) + (',' + ($elm$core$String$fromInt(g) + (',' + ($elm$core$String$fromInt(b) + (',' + (alphaStr + ')')))))));
	});
var $author$project$PF6$Charts$Theme$labelColor = function (_v0) {
	var c = _v0;
	return c.o;
};
var $author$project$Axis$horizontalAttrs = {
	cH: true,
	dB: function (y) {
		return 'translate(0, ' + ($elm$core$String$fromFloat(y) + ')');
	},
	dG: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x, $elm$core$String$fromFloat),
	eV: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x1, $elm$core$String$fromFloat),
	dH: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x2, $elm$core$String$fromFloat),
	dJ: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y, $elm$core$String$fromFloat),
	dK: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y1, $elm$core$String$fromFloat),
	dL: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y2, $elm$core$String$fromFloat)
};
var $author$project$Axis$left = A4($author$project$Axis$element, $author$project$Axis$horizontalAttrs, -1, '0.32em', 'end');
var $author$project$Shape$Generators$line = F2(
	function (curve, data) {
		var makeCurves = F2(
			function (datum, _v3) {
				var prev = _v3.a;
				var list = _v3.b;
				var _v0 = _Utils_Tuple3(prev, datum, list);
				if (_v0.b.$ === 1) {
					var _v1 = _v0.b;
					var l = _v0.c;
					return _Utils_Tuple2(false, l);
				} else {
					if (!_v0.a) {
						var point = _v0.b.a;
						var l = _v0.c;
						return _Utils_Tuple2(
							true,
							A2(
								$elm$core$List$cons,
								_List_fromArray(
									[point]),
								l));
					} else {
						if (_v0.c.b) {
							var p1 = _v0.b.a;
							var _v2 = _v0.c;
							var ps = _v2.a;
							var l = _v2.b;
							return _Utils_Tuple2(
								true,
								A2(
									$elm$core$List$cons,
									A2($elm$core$List$cons, p1, ps),
									l));
						} else {
							var p1 = _v0.b.a;
							var l = _v0.c;
							return _Utils_Tuple2(
								true,
								A2(
									$elm$core$List$cons,
									_List_fromArray(
										[p1]),
									l));
						}
					}
				}
			});
		return A2(
			$elm$core$List$map,
			curve,
			A3(
				$elm$core$List$foldr,
				makeCurves,
				_Utils_Tuple2(false, _List_Nil),
				data).b);
	});
var $author$project$Shape$line = $author$project$Shape$Generators$line;
var $author$project$Scale$Scale = $elm$core$Basics$identity;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $author$project$Scale$Continuous$normalize = F2(
	function (a, b) {
		var c = b - a;
		return (!c) ? $elm$core$Basics$always(0.5) : ($elm$core$Basics$isNaN(c) ? $elm$core$Basics$always(0 / 0) : function (x) {
			return (x - a) / c;
		});
	});
var $author$project$Scale$Continuous$bimap = F3(
	function (_v0, _v1, interpolate) {
		var d0 = _v0.a;
		var d1 = _v0.b;
		var r0 = _v1.a;
		var r1 = _v1.b;
		var _v2 = (_Utils_cmp(d1, d0) < 0) ? _Utils_Tuple2(
			A2($author$project$Scale$Continuous$normalize, d1, d0),
			A2(interpolate, r1, r0)) : _Utils_Tuple2(
			A2($author$project$Scale$Continuous$normalize, d0, d1),
			A2(interpolate, r0, r1));
		var de = _v2.a;
		var re = _v2.b;
		return A2($elm$core$Basics$composeL, re, de);
	});
var $author$project$Scale$Continuous$convertTransform = F4(
	function (transform, interpolate, _v0, range) {
		var d0 = _v0.a;
		var d1 = _v0.b;
		return A2(
			$elm$core$Basics$composeR,
			transform,
			A3(
				$author$project$Scale$Continuous$bimap,
				_Utils_Tuple2(
					transform(d0),
					transform(d1)),
				range,
				interpolate));
	});
var $author$project$Interpolation$float = F2(
	function (a, to) {
		var b = to - a;
		return function (t) {
			return a + (b * t);
		};
	});
var $author$project$Scale$Continuous$invertTransform = F4(
	function (transform, untransform, _v0, range) {
		var d0 = _v0.a;
		var d1 = _v0.b;
		return A2(
			$elm$core$Basics$composeR,
			A3(
				$author$project$Scale$Continuous$bimap,
				range,
				_Utils_Tuple2(
					transform(d0),
					transform(d1)),
				$author$project$Interpolation$float),
			untransform);
	});
var $author$project$Scale$Continuous$fixPoint = F3(
	function (maxIterations, initialInput, fn) {
		var helper = F2(
			function (iters, _v0) {
				helper:
				while (true) {
					var a = _v0.a;
					var b = _v0.b;
					if (_Utils_cmp(iters + 1, maxIterations) > -1) {
						return b;
					} else {
						var _v1 = fn(b);
						var outA = _v1.a;
						var outB = _v1.b;
						if (_Utils_eq(outA, a)) {
							return b;
						} else {
							if (!outA) {
								return b;
							} else {
								var $temp$iters = iters + 1,
									$temp$_v0 = _Utils_Tuple2(outA, outB);
								iters = $temp$iters;
								_v0 = $temp$_v0;
								continue helper;
							}
						}
					}
				}
			});
		return A2(
			helper,
			1,
			fn(initialInput));
	});
var $elm$core$Basics$e = _Basics_e;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $author$project$Scale$Continuous$e10 = $elm$core$Basics$sqrt(50);
var $author$project$Scale$Continuous$e2 = $elm$core$Basics$sqrt(2);
var $author$project$Scale$Continuous$e5 = $elm$core$Basics$sqrt(10);
var $author$project$Scale$Continuous$ln10 = A2($elm$core$Basics$logBase, $elm$core$Basics$e, 10);
var $author$project$Scale$Continuous$tickIncrement = F3(
	function (start, stop, count) {
		var step = (stop - start) / A2($elm$core$Basics$max, 0, count);
		var powr = $elm$core$Basics$floor(
			A2($elm$core$Basics$logBase, $elm$core$Basics$e, step) / $author$project$Scale$Continuous$ln10);
		var error = step / A2($elm$core$Basics$pow, 10, powr);
		var order = (_Utils_cmp(error, $author$project$Scale$Continuous$e10) > -1) ? 10 : ((_Utils_cmp(error, $author$project$Scale$Continuous$e5) > -1) ? 5 : ((_Utils_cmp(error, $author$project$Scale$Continuous$e2) > -1) ? 2 : 1));
		return (powr >= 0) ? (order * A2($elm$core$Basics$pow, 10, powr)) : ((-A2($elm$core$Basics$pow, 10, -powr)) / order);
	});
var $author$project$Scale$Continuous$withNormalizedDomain = F2(
	function (fn, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		if (_Utils_cmp(a, b) < 0) {
			return fn(
				_Utils_Tuple2(a, b));
		} else {
			var _v1 = fn(
				_Utils_Tuple2(b, a));
			var d = _v1.a;
			var c = _v1.b;
			return _Utils_Tuple2(c, d);
		}
	});
var $author$project$Scale$Continuous$nice = F2(
	function (domain, count) {
		var computation = function (_v0) {
			var start = _v0.a;
			var stop = _v0.b;
			var step = A3($author$project$Scale$Continuous$tickIncrement, start, stop, count);
			return _Utils_Tuple2(
				step,
				(step > 0) ? _Utils_Tuple2(
					$elm$core$Basics$floor(start / step) * step,
					$elm$core$Basics$ceiling(stop / step) * step) : ((step < 0) ? _Utils_Tuple2(
					$elm$core$Basics$ceiling(start * step) / step,
					$elm$core$Basics$floor(stop * step) / step) : _Utils_Tuple2(start, stop)));
		};
		return A2(
			$author$project$Scale$Continuous$withNormalizedDomain,
			function (dmn) {
				return A3($author$project$Scale$Continuous$fixPoint, 10, dmn, computation);
			},
			domain);
	});
var $author$project$Scale$Continuous$exponent = function (num) {
	var helper = F2(
		function (soFar, x) {
			helper:
			while (true) {
				if (!x) {
					return soFar;
				} else {
					if (x < 1) {
						var $temp$soFar = 1 + soFar,
							$temp$x = x * 10;
						soFar = $temp$soFar;
						x = $temp$x;
						continue helper;
					} else {
						return soFar;
					}
				}
			}
		});
	return A2(helper, 0, num);
};
var $author$project$Scale$Continuous$precisionFixed = function (step) {
	return A2(
		$elm$core$Basics$max,
		0,
		$author$project$Scale$Continuous$exponent(
			$elm$core$Basics$abs(step)));
};
var $author$project$Statistics$tickStep = F3(
	function (start, stop, count) {
		var step0 = $elm$core$Basics$abs(stop - start) / A2($elm$core$Basics$max, 0, count);
		var step1 = A2(
			$elm$core$Basics$pow,
			10,
			$elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Basics$e, step0) / A2($elm$core$Basics$logBase, $elm$core$Basics$e, 10)));
		var error = step0 / step1;
		var step2 = (_Utils_cmp(
			error,
			$elm$core$Basics$sqrt(50)) > -1) ? (step1 * 10) : ((_Utils_cmp(
			error,
			$elm$core$Basics$sqrt(10)) > -1) ? (step1 * 5) : ((_Utils_cmp(
			error,
			$elm$core$Basics$sqrt(2)) > -1) ? (step1 * 2) : step1));
		return (_Utils_cmp(stop, start) < 0) ? (-step2) : step2;
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $author$project$Scale$Continuous$toFixed = F2(
	function (precision, value) {
		var power_ = A2($elm$core$Basics$pow, 10, precision);
		var pad = function (num) {
			_v0$2:
			while (true) {
				if (num.b) {
					if (num.b.b) {
						if (!num.b.b.b) {
							var x = num.a;
							var _v1 = num.b;
							var y = _v1.a;
							return _List_fromArray(
								[
									x,
									A3($elm$core$String$padRight, precision, '0', y)
								]);
						} else {
							break _v0$2;
						}
					} else {
						var val = num.a;
						return (precision > 0) ? _List_fromArray(
							[
								val,
								A3($elm$core$String$padRight, precision, '0', '')
							]) : _List_fromArray(
							[val]);
					}
				} else {
					break _v0$2;
				}
			}
			var val = num;
			return val;
		};
		return A2(
			$elm$core$String$join,
			'.',
			pad(
				A2(
					$elm$core$String$split,
					'.',
					$elm$core$String$fromFloat(
						$elm$core$Basics$round(value * power_) / power_))));
	});
var $author$project$Scale$Continuous$tickFormat = F2(
	function (_v0, count) {
		var start = _v0.a;
		var stop = _v0.b;
		return $author$project$Scale$Continuous$toFixed(
			$author$project$Scale$Continuous$precisionFixed(
				A3($author$project$Statistics$tickStep, start, stop, count)));
	});
var $elmcraft$core_extra$Float$Extra$range = F3(
	function (start, stop, step) {
		if (!step) {
			return _List_Nil;
		} else {
			var n = A2(
				$elm$core$Basics$max,
				0,
				$elm$core$Basics$ceiling((stop - start) / step));
			var helper = F2(
				function (i, list) {
					helper:
					while (true) {
						if (i >= 0) {
							var $temp$i = i - 1,
								$temp$list = A2($elm$core$List$cons, start + (step * i), list);
							i = $temp$i;
							list = $temp$list;
							continue helper;
						} else {
							return list;
						}
					}
				});
			return A2(helper, n - 1, _List_Nil);
		}
	});
var $author$project$Statistics$range = $elmcraft$core_extra$Float$Extra$range;
var $author$project$Statistics$ticks = F3(
	function (start, stop, count) {
		var step = A3($author$project$Statistics$tickStep, start, stop, count);
		var end = ($elm$core$Basics$floor(stop / step) * step) + (step / 2);
		var beg = $elm$core$Basics$ceiling(start / step) * step;
		return A3($author$project$Statistics$range, beg, end, step);
	});
var $author$project$Scale$Continuous$ticks = F2(
	function (_v0, count) {
		var start = _v0.a;
		var end = _v0.b;
		return A3($author$project$Statistics$ticks, start, end, count);
	});
var $author$project$Scale$Continuous$scaleWithTransform = F4(
	function (transform, untransform, range_, domain_) {
		return {
			ag: A2($author$project$Scale$Continuous$convertTransform, transform, $author$project$Interpolation$float),
			D: domain_,
			fk: A2($author$project$Scale$Continuous$invertTransform, transform, untransform),
			ek: $author$project$Scale$Continuous$nice,
			W: range_,
			di: F2(
				function (_v0, r) {
					return r;
				}),
			dz: $author$project$Scale$Continuous$tickFormat,
			dA: $author$project$Scale$Continuous$ticks
		};
	});
var $author$project$Scale$Continuous$linear = A2($author$project$Scale$Continuous$scaleWithTransform, $elm$core$Basics$identity, $elm$core$Basics$identity);
var $author$project$Scale$linear = F2(
	function (range_, domain_) {
		return A2($author$project$Scale$Continuous$linear, range_, domain_);
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$cubicCurveTo = $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo;
var $folkertdev$one_true_path_experiment$SubPath$empty = $folkertdev$one_true_path_experiment$SubPath$Empty;
var $ianmackenzie$elm_units$Quantity$Quantity = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$float = function (value) {
	return value;
};
var $ianmackenzie$elm_geometry$Geometry$Types$Vector2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Vector2d$xy = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return {dG: x, dJ: y};
	});
var $ianmackenzie$elm_geometry$Vector2d$fromTuple = F2(
	function (toQuantity, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return A2(
			$ianmackenzie$elm_geometry$Vector2d$xy,
			toQuantity(x),
			toQuantity(y));
	});
var $folkertdev$one_true_path_experiment$Curve$monotonePoint = F4(
	function (_v0, _v1, t0, t1) {
		var x0 = _v0.a;
		var y0 = _v0.b;
		var x1 = _v1.a;
		var y1 = _v1.b;
		var dx = (x1 - x0) / 3;
		return _Utils_Tuple3(
			_Utils_Tuple2(x0 + dx, y0 + (dx * t0)),
			_Utils_Tuple2(x1 - dx, y1 - (dx * t1)),
			_Utils_Tuple2(x1, y1));
	});
var $ianmackenzie$elm_geometry$Vector2d$minus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {dG: v1.dG - v2.dG, dJ: v1.dJ - v2.dJ};
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $ianmackenzie$elm_units$Quantity$toFloat = function (_v0) {
	var value = _v0;
	return value;
};
var $ianmackenzie$elm_geometry$Vector2d$xComponent = function (_v0) {
	var v = _v0;
	return v.dG;
};
var $ianmackenzie$elm_geometry$Vector2d$yComponent = function (_v0) {
	var v = _v0;
	return v.dJ;
};
var $ianmackenzie$elm_geometry$Vector2d$toTuple = F2(
	function (fromQuantity, vector) {
		return _Utils_Tuple2(
			fromQuantity(
				$ianmackenzie$elm_geometry$Vector2d$xComponent(vector)),
			fromQuantity(
				$ianmackenzie$elm_geometry$Vector2d$yComponent(vector)));
	});
var $folkertdev$one_true_path_experiment$Curve$slope2 = F3(
	function (p0, p1, t) {
		var _v0 = A2(
			$ianmackenzie$elm_geometry$Vector2d$toTuple,
			$ianmackenzie$elm_units$Quantity$toFloat,
			A2($ianmackenzie$elm_geometry$Vector2d$minus, p1, p0));
		var dx = _v0.a;
		var dy = _v0.b;
		return (!(!dx)) ? ((((3 * dy) / dx) - t) / 2) : t;
	});
var $folkertdev$one_true_path_experiment$Curve$sign = function (x) {
	return (x < 0) ? (-1) : 1;
};
var $folkertdev$one_true_path_experiment$Curve$toH = F2(
	function (h0, h1) {
		return (!h0) ? ((h1 < 0) ? (0 * (-1)) : h1) : h0;
	});
var $folkertdev$one_true_path_experiment$Curve$slope3 = F3(
	function (p0, p1, p2) {
		var _v0 = A2(
			$ianmackenzie$elm_geometry$Vector2d$toTuple,
			$ianmackenzie$elm_units$Quantity$toFloat,
			A2($ianmackenzie$elm_geometry$Vector2d$minus, p1, p2));
		var dx2 = _v0.a;
		var dy2 = _v0.b;
		var _v1 = A2(
			$ianmackenzie$elm_geometry$Vector2d$toTuple,
			$ianmackenzie$elm_units$Quantity$toFloat,
			A2($ianmackenzie$elm_geometry$Vector2d$minus, p0, p1));
		var dx1 = _v1.a;
		var dy1 = _v1.b;
		var _v2 = _Utils_Tuple2(
			A2($folkertdev$one_true_path_experiment$Curve$toH, dx1, dx2),
			A2($folkertdev$one_true_path_experiment$Curve$toH, dx2, dx1));
		var s0h = _v2.a;
		var s1h = _v2.b;
		var s1 = dy2 / s1h;
		var s0 = dy1 / s0h;
		var p = ((s0 * dx2) + (s1 * dx1)) / (dx1 + dx2);
		return ($folkertdev$one_true_path_experiment$Curve$sign(s0) + $folkertdev$one_true_path_experiment$Curve$sign(s1)) * A2(
			$elm$core$Basics$min,
			A2(
				$elm$core$Basics$min,
				$elm$core$Basics$abs(s0),
				$elm$core$Basics$abs(s1)),
			0.5 * $elm$core$Basics$abs(p));
	});
var $folkertdev$one_true_path_experiment$Curve$monotoneXHelper = F3(
	function (acc, t0, remaininPoints) {
		monotoneXHelper:
		while (true) {
			if (remaininPoints.b && remaininPoints.b.b) {
				if (remaininPoints.b.b.b) {
					var p0 = remaininPoints.a;
					var _v1 = remaininPoints.b;
					var p1 = _v1.a;
					var _v2 = _v1.b;
					var p = _v2.a;
					var rest = _v2.b;
					var t1 = A3(
						$folkertdev$one_true_path_experiment$Curve$slope3,
						A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p0),
						A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p1),
						A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p));
					var $temp$acc = A2(
						$elm$core$List$cons,
						A4($folkertdev$one_true_path_experiment$Curve$monotonePoint, p0, p1, t0, t1),
						acc),
						$temp$t0 = t1,
						$temp$remaininPoints = A2(
						$elm$core$List$cons,
						p1,
						A2($elm$core$List$cons, p, rest));
					acc = $temp$acc;
					t0 = $temp$t0;
					remaininPoints = $temp$remaininPoints;
					continue monotoneXHelper;
				} else {
					var p0 = remaininPoints.a;
					var _v3 = remaininPoints.b;
					var p1 = _v3.a;
					var t1 = A3(
						$folkertdev$one_true_path_experiment$Curve$slope2,
						A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p0),
						A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p1),
						t0);
					return $elm$core$List$reverse(
						A2(
							$elm$core$List$cons,
							A4($folkertdev$one_true_path_experiment$Curve$monotonePoint, p0, p1, t0, t1),
							acc));
				}
			} else {
				return _List_Nil;
			}
		}
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$MoveTo = $elm$core$Basics$identity;
var $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo = $elm$core$Basics$identity;
var $folkertdev$one_true_path_experiment$SubPath$with = F2(
	function (moveto, drawtos) {
		return $folkertdev$one_true_path_experiment$SubPath$SubPath(
			{
				fa: $folkertdev$elm_deque$Deque$fromList(drawtos),
				fv: moveto
			});
	});
var $folkertdev$one_true_path_experiment$Curve$monotoneX = function (points) {
	if (points.b && points.b.b) {
		if (points.b.b.b) {
			var p0 = points.a;
			var _v1 = points.b;
			var p1 = _v1.a;
			var _v2 = _v1.b;
			var p = _v2.a;
			var rest = _v2.b;
			var t1 = A3(
				$folkertdev$one_true_path_experiment$Curve$slope3,
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p0),
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p1),
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p));
			var otherInstructions = A3(
				$folkertdev$one_true_path_experiment$Curve$monotoneXHelper,
				_List_Nil,
				t1,
				A2(
					$elm$core$List$cons,
					p1,
					A2($elm$core$List$cons, p, rest)));
			var initialInstruction = A4(
				$folkertdev$one_true_path_experiment$Curve$monotonePoint,
				p0,
				p1,
				A3(
					$folkertdev$one_true_path_experiment$Curve$slope2,
					A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p0),
					A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p1),
					t1),
				t1);
			return A2(
				$folkertdev$one_true_path_experiment$SubPath$with,
				$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(p0),
				_List_fromArray(
					[
						$folkertdev$one_true_path_experiment$LowLevel$Command$cubicCurveTo(
						A2($elm$core$List$cons, initialInstruction, otherInstructions))
					]));
		} else {
			var p0 = points.a;
			var _v3 = points.b;
			var p1 = _v3.a;
			return A2(
				$folkertdev$one_true_path_experiment$SubPath$with,
				$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(p0),
				_List_fromArray(
					[
						$folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(
						_List_fromArray(
							[p1]))
					]));
		}
	} else {
		return $folkertdev$one_true_path_experiment$SubPath$empty;
	}
};
var $author$project$Shape$monotoneInXCurve = $folkertdev$one_true_path_experiment$Curve$monotoneX;
var $elm$virtual_dom$VirtualDom$nodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_nodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$svg$Svg$node = $elm$virtual_dom$VirtualDom$nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
var $elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $author$project$Axis$TickCount = function (a) {
	return {$: 2, a: a};
};
var $author$project$Axis$tickCount = $author$project$Axis$TickCount;
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
var $author$project$PF6$Charts$Internal$Skeleton$shimmerStyle = A3(
	$elm$svg$Svg$node,
	'style',
	_List_Nil,
	_List_fromArray(
		[
			$elm$svg$Svg$text('\n            @keyframes pf-shimmer {\n              0%   { opacity: 0.35; }\n              50%  { opacity: 0.65; }\n              100% { opacity: 0.35; }\n            }\n            .pf-skeleton { animation: pf-shimmer 1.4s ease-in-out infinite; }\n            ')
		]));
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$PF6$Charts$Internal$Skeleton$xTickPlaceholders = F6(
	function (padLeft, padTop, padBottom, innerW, innerH, color) {
		return A2(
			$elm$core$List$map,
			function (i) {
				var x = padLeft + $elm$core$Basics$round(innerW * (i / 5));
				return A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromInt(x - 12)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt((padTop + innerH) + 10)),
							$elm$svg$Svg$Attributes$width('24'),
							$elm$svg$Svg$Attributes$height('8'),
							$elm$svg$Svg$Attributes$fill(color),
							$elm$svg$Svg$Attributes$rx('3'),
							$elm$svg$Svg$Attributes$class('pf-skeleton')
						]),
					_List_Nil);
			},
			A2($elm$core$List$range, 0, 5));
	});
var $author$project$PF6$Charts$Internal$Skeleton$yTickPlaceholders = F4(
	function (padLeft, padTop, innerH, color) {
		return A2(
			$elm$core$List$map,
			function (i) {
				var y = padTop + $elm$core$Basics$round(innerH * (i / 5));
				return A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromInt(padLeft - 28)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt(y - 4)),
							$elm$svg$Svg$Attributes$width('24'),
							$elm$svg$Svg$Attributes$height('8'),
							$elm$svg$Svg$Attributes$fill(color),
							$elm$svg$Svg$Attributes$rx('3'),
							$elm$svg$Svg$Attributes$class('pf-skeleton')
						]),
					_List_Nil);
			},
			A2($elm$core$List$range, 0, 5));
	});
var $author$project$PF6$Charts$Internal$Skeleton$view = F2(
	function (w, h) {
		var padTop = 20;
		var padRight = 20;
		var padLeft = 50;
		var padBottom = 40;
		var innerW = (w - padLeft) - padRight;
		var innerH = (h - padTop) - padBottom;
		var barColor = '#d2d2d2';
		var axisColor = '#e8e8e8';
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromInt(w)),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromInt(h)),
					$elm$svg$Svg$Attributes$viewBox(
					'0 0 ' + ($elm$core$String$fromInt(w) + (' ' + $elm$core$String$fromInt(h))))
				]),
			_List_fromArray(
				[
					$author$project$PF6$Charts$Internal$Skeleton$shimmerStyle,
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromInt(padLeft - 1)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt(padTop)),
							$elm$svg$Svg$Attributes$width('2'),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(innerH)),
							$elm$svg$Svg$Attributes$fill(axisColor),
							$elm$svg$Svg$Attributes$class('pf-skeleton')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromInt(padLeft)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt(padTop + innerH)),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(innerW)),
							$elm$svg$Svg$Attributes$height('2'),
							$elm$svg$Svg$Attributes$fill(axisColor),
							$elm$svg$Svg$Attributes$class('pf-skeleton')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromInt(padLeft + 4)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt(
								padTop + $elm$core$Basics$round(innerH * 0.2))),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(innerW - 8)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(
								$elm$core$Basics$round(innerH * 0.7))),
							$elm$svg$Svg$Attributes$fill(barColor),
							$elm$svg$Svg$Attributes$rx('4'),
							$elm$svg$Svg$Attributes$class('pf-skeleton')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$g,
					_List_Nil,
					A4($author$project$PF6$Charts$Internal$Skeleton$yTickPlaceholders, padLeft, padTop, innerH, axisColor)),
					A2(
					$elm$svg$Svg$g,
					_List_Nil,
					A6($author$project$PF6$Charts$Internal$Skeleton$xTickPlaceholders, padLeft, padTop, padBottom, innerW, innerH, axisColor))
				]));
	});
var $author$project$PF6$Charts$Area$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return A2($author$project$PF6$Charts$Internal$Skeleton$view, cfg.aB, cfg.as);
	} else {
		var ys = A2($elm$core$List$map, $elm$core$Tuple$second, cfg.b0);
		var yMax = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$maximum(ys));
		var xs = A2($elm$core$List$map, $elm$core$Tuple$first, cfg.b0);
		var xMin = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(xs));
		var xMax = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$maximum(xs));
		var padTop = (cfg.H !== '') ? 40 : 20;
		var padRight = 30;
		var padLeft = (cfg.bg !== '') ? 65 : 50;
		var padBottom = (cfg.be !== '') ? 55 : 40;
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var innerW = (cfg.aB - padLeft) - padRight;
		var xScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(0, innerW),
			_Utils_Tuple2(xMin, xMax));
		var innerH = (cfg.as - padTop) - padBottom;
		var yScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(innerH, 0),
			_Utils_Tuple2(0, yMax * 1.1));
		var toAreaPoint = function (_v3) {
			var x = _v3.a;
			var y = _v3.b;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(
					_Utils_Tuple2(
						A2($author$project$Scale$convert, xScale, x),
						A2($author$project$Scale$convert, yScale, 0)),
					_Utils_Tuple2(
						A2($author$project$Scale$convert, xScale, x),
						A2($author$project$Scale$convert, yScale, y))));
		};
		var toLinePoint = function (_v2) {
			var x = _v2.a;
			var y = _v2.b;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(
					A2($author$project$Scale$convert, xScale, x),
					A2($author$project$Scale$convert, yScale, y)));
		};
		var linePath = A2(
			$author$project$Shape$line,
			$author$project$Shape$monotoneInXCurve,
			A2($elm$core$List$map, toLinePoint, cfg.b0));
		var gridColor = $author$project$PF6$Charts$Theme$gridColor(cfg.aO);
		var gridLines = A2(
			$elm$core$List$map,
			function (tick) {
				var y = A2($author$project$Scale$convert, yScale, tick);
				return A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x1('0'),
							$elm$svg$Svg$Attributes$x2(
							$elm$core$String$fromInt(innerW)),
							$elm$svg$Svg$Attributes$y1(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$y2(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$stroke(gridColor),
							$elm$svg$Svg$Attributes$strokeWidth('1'),
							$elm$svg$Svg$Attributes$strokeDasharray('4,4')
						]),
					_List_Nil);
			},
			A2($author$project$Scale$ticks, yScale, 5));
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var fillColor = A2($author$project$PF6$Charts$Internal$Color$hexToRgba, cfg.aU, cfg.b3);
		var axisColor = $author$project$PF6$Charts$Theme$axisColor(cfg.aO);
		var areaPath = A2(
			$author$project$Shape$area,
			$author$project$Shape$monotoneInXCurve,
			A2($elm$core$List$map, toAreaPoint, cfg.b0));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(cfg.aB)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(cfg.as)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(cfg.aB) + (' ' + $elm$core$String$fromInt(cfg.as)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + ('; font-size: 12px; fill: ' + (labelColor + ';'))))
						]),
					_List_fromArray(
						[
							(cfg.H !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt((cfg.aB / 2) | 0)),
									$elm$svg$Svg$Attributes$y('20'),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('14'),
									$elm$svg$Svg$Attributes$fontWeight('600'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.H)
								])) : $elm$svg$Svg$text(''),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(padLeft) + (',' + ($elm$core$String$fromInt(padTop) + ')'))))
								]),
							_Utils_ap(
								gridLines,
								_Utils_ap(
									_List_fromArray(
										[
											A2(
											$folkertdev$one_true_path_experiment$Path$element,
											areaPath,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$fill(fillColor),
													$elm$svg$Svg$Attributes$stroke('none')
												])),
											A2(
											$folkertdev$one_true_path_experiment$Path$element,
											linePath,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$fill('none'),
													$elm$svg$Svg$Attributes$stroke(cfg.aU),
													$elm$svg$Svg$Attributes$strokeWidth('2'),
													$elm$svg$Svg$Attributes$strokeLinejoin('round')
												])),
											A2(
											$elm$svg$Svg$g,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$transform(
													'translate(0,' + ($elm$core$String$fromInt(innerH) + ')'))
												]),
											_List_fromArray(
												[
													A2(
													$author$project$Axis$bottom,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(6)
														]),
													xScale)
												])),
											A2(
											$elm$svg$Svg$g,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$author$project$Axis$left,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(5)
														]),
													yScale)
												]))
										]),
									cfg.cp ? A2(
										$elm$core$List$map,
										function (_v1) {
											var x = _v1.a;
											var y = _v1.b;
											return A2(
												$elm$svg$Svg$g,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$svg$Svg$circle,
														_List_fromArray(
															[
																$elm$svg$Svg$Attributes$cx(
																$elm$core$String$fromFloat(
																	A2($author$project$Scale$convert, xScale, x))),
																$elm$svg$Svg$Attributes$cy(
																$elm$core$String$fromFloat(
																	A2($author$project$Scale$convert, yScale, y))),
																$elm$svg$Svg$Attributes$r('6'),
																$elm$svg$Svg$Attributes$fill('transparent'),
																$elm$svg$Svg$Attributes$stroke('none')
															]),
														_List_fromArray(
															[
																A3(
																$elm$svg$Svg$node,
																'title',
																_List_Nil,
																_List_fromArray(
																	[
																		$elm$svg$Svg$text(
																		'x: ' + ($elm$core$String$fromFloat(x) + (', y: ' + $elm$core$String$fromFloat(y))))
																	]))
															]))
													]));
										},
										cfg.b0) : _List_Nil))),
							(cfg.be !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt(padLeft + ((innerW / 2) | 0))),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromInt(cfg.as - 8)),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.be)
								])) : $elm$svg$Svg$text(''),
							(cfg.bg !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'rotate(-90) translate(-' + ($elm$core$String$fromInt(padTop + ((innerH / 2) | 0)) + ',14)')),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.bg)
								])) : $elm$svg$Svg$text('')
						]))
				]));
	}
};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $author$project$Scale$Band$normalizeConfig = function (_v0) {
	var paddingInner = _v0.ep;
	var paddingOuter = _v0.eq;
	var align = _v0.dP;
	return {
		dP: A3($elm$core$Basics$clamp, 0, 1, align),
		ep: A3($elm$core$Basics$clamp, 0, 1, paddingInner),
		eq: A3($elm$core$Basics$clamp, 0, 1, paddingOuter)
	};
};
var $author$project$Scale$Band$bandwidth = F3(
	function (cfg, domain, _v0) {
		var d0 = _v0.a;
		var d1 = _v0.b;
		var n = $elm$core$List$length(domain);
		var _v1 = (_Utils_cmp(d0, d1) < 0) ? _Utils_Tuple2(d0, d1) : _Utils_Tuple2(d1, d0);
		var start = _v1.a;
		var stop = _v1.b;
		var _v2 = $author$project$Scale$Band$normalizeConfig(cfg);
		var paddingInner = _v2.ep;
		var paddingOuter = _v2.eq;
		var step = (stop - start) / A2($elm$core$Basics$max, 1, (n - paddingInner) + (paddingOuter * 2));
		return step * (1 - paddingInner);
	});
var $author$project$Scale$Band$computePositions = F3(
	function (cfg, n, _v0) {
		var start = _v0.a;
		var stop = _v0.b;
		var _v1 = $author$project$Scale$Band$normalizeConfig(cfg);
		var paddingInner = _v1.ep;
		var paddingOuter = _v1.eq;
		var align = _v1.dP;
		var step = (stop - start) / A2($elm$core$Basics$max, 1, (n - paddingInner) + (paddingOuter * 2));
		var start2 = start + (((stop - start) - (step * (n - paddingInner))) * align);
		return _Utils_Tuple2(start2, step);
	});
var $author$project$Scale$Band$indexOfHelp = F3(
	function (index, value, list) {
		indexOfHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (_Utils_eq(value, x)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$value = value,
						$temp$list = xs;
					index = $temp$index;
					value = $temp$value;
					list = $temp$list;
					continue indexOfHelp;
				}
			}
		}
	});
var $author$project$Scale$Band$indexOf = $author$project$Scale$Band$indexOfHelp(0);
var $author$project$Scale$Band$convert = F4(
	function (cfg, domain, _v0, value) {
		var start = _v0.a;
		var stop = _v0.b;
		var _v1 = A2($author$project$Scale$Band$indexOf, value, domain);
		if (!_v1.$) {
			var index = _v1.a;
			var n = $elm$core$List$length(domain);
			if (_Utils_cmp(start, stop) < 0) {
				var _v2 = A3(
					$author$project$Scale$Band$computePositions,
					cfg,
					n,
					_Utils_Tuple2(start, stop));
				var start2 = _v2.a;
				var step = _v2.b;
				return start2 + (step * index);
			} else {
				var _v3 = A3(
					$author$project$Scale$Band$computePositions,
					cfg,
					n,
					_Utils_Tuple2(stop, start));
				var stop2 = _v3.a;
				var step = _v3.b;
				return stop2 + (step * ((n - index) - 1));
			}
		} else {
			return 0 / 0;
		}
	});
var $author$project$Scale$band = F3(
	function (config, range_, domain_) {
		return {
			bT: A3($author$project$Scale$Band$bandwidth, config, domain_, range_),
			ag: $author$project$Scale$Band$convert(config),
			D: domain_,
			W: range_
		};
	});
var $author$project$Scale$bandwidth = function (_v0) {
	var scale = _v0;
	return scale.bT;
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$PF6$Charts$Bar$indexOf = F2(
	function (target, list) {
		return A2(
			$elm$core$Maybe$withDefault,
			0,
			A2(
				$elm$core$Maybe$map,
				$elm$core$Tuple$first,
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v0) {
							var v = _v0.b;
							return _Utils_eq(v, target);
						},
						A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, list)))));
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $elm$svg$Svg$Attributes$ry = _VirtualDom_attribute('ry');
var $author$project$Scale$toRenderable = F2(
	function (toString, _v0) {
		var scale = _v0;
		return {
			ag: F3(
				function (dmn, rng, value) {
					return A3(scale.ag, dmn, rng, value) + (A2($elm$core$Basics$max, scale.bT - 1, 0) / 2);
				}),
			D: scale.D,
			W: scale.W,
			di: F2(
				function (_v1, rng) {
					return rng;
				}),
			dz: F2(
				function (_v2, _v3) {
					return toString;
				}),
			dA: F2(
				function (dmn, _v4) {
					return dmn;
				})
		};
	});
var $author$project$PF6$Charts$Bar$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return A2($author$project$PF6$Charts$Internal$Skeleton$view, cfg.aB, cfg.as);
	} else {
		var seriesColors = _Utils_ap(
			cfg.bX,
			A2($elm$core$List$repeat, 20, $author$project$PF6$Charts$Colors$primary));
		var padTop = (cfg.H !== '') ? 40 : 20;
		var padRight = 20;
		var padLeft = (cfg.bg !== '') ? 65 : 50;
		var padBottom = (cfg.be !== '') ? 60 : 50;
		var numSeries = $elm$core$List$length(cfg.a4);
		var legendWidth = numSeries * 110;
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var legendItems = (numSeries > 1) ? A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, series) {
					var xOff = idx * 110;
					var color = A2(
						$elm$core$Maybe$withDefault,
						$author$project$PF6$Charts$Colors$primary,
						$elm$core$List$head(
							A2($elm$core$List$drop, idx, seriesColors)));
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$transform(
								'translate(' + ($elm$core$String$fromInt(xOff) + ',0)'))
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$rect,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x('0'),
										$elm$svg$Svg$Attributes$y('0'),
										$elm$svg$Svg$Attributes$width('12'),
										$elm$svg$Svg$Attributes$height('12'),
										$elm$svg$Svg$Attributes$fill(color),
										$elm$svg$Svg$Attributes$rx('2')
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x('16'),
										$elm$svg$Svg$Attributes$y('10'),
										$elm$svg$Svg$Attributes$fontSize('11'),
										$elm$svg$Svg$Attributes$fill(labelColor)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(series.o)
									]))
							]));
				}),
			cfg.a4) : _List_Nil;
		var innerW = (cfg.aB - padLeft) - padRight;
		var legendX = padLeft + A2($elm$core$Basics$max, 0, ((innerW / 2) | 0) - ((legendWidth / 2) | 0));
		var outerScale = A3(
			$author$project$Scale$band,
			{dP: 0.5, ep: 0.15, eq: 0.1},
			_Utils_Tuple2(0, innerW),
			cfg.bm);
		var outerBandwidth = $author$project$Scale$bandwidth(outerScale);
		var innerScale = A3(
			$author$project$Scale$band,
			{dP: 0.5, ep: 0.05, eq: 0},
			_Utils_Tuple2(0, outerBandwidth),
			A2($elm$core$List$range, 0, numSeries - 1));
		var innerH = (cfg.as - padTop) - padBottom;
		var innerBandwidth = $author$project$Scale$bandwidth(innerScale);
		var gridColor = $author$project$PF6$Charts$Theme$gridColor(cfg.aO);
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var allValues = A2(
			$elm$core$List$concatMap,
			function ($) {
				return $.bR;
			},
			cfg.a4);
		var yMax = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$maximum(allValues));
		var yScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(innerH, 0),
			_Utils_Tuple2(0, yMax * 1.1));
		var bars = A2(
			$elm$core$List$concatMap,
			function (cat) {
				var catX = A2($author$project$Scale$convert, outerScale, cat);
				return A2(
					$elm$core$List$indexedMap,
					F2(
						function (si, series) {
							var val = A2(
								$elm$core$Maybe$withDefault,
								0,
								$elm$core$List$head(
									A2(
										$elm$core$List$drop,
										A2($author$project$PF6$Charts$Bar$indexOf, cat, cfg.bm),
										series.bR)));
							var rx = A2($elm$core$Basics$min, 2, innerBandwidth / 4);
							var color = A2(
								$elm$core$Maybe$withDefault,
								$author$project$PF6$Charts$Colors$primary,
								$elm$core$List$head(
									A2($elm$core$List$drop, si, seriesColors)));
							var barY = A2($author$project$Scale$convert, yScale, val);
							var barX = catX + A2($author$project$Scale$convert, innerScale, si);
							var barH = innerH - A2($author$project$Scale$convert, yScale, val);
							return A2(
								$elm$svg$Svg$g,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$svg$Svg$rect,
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$x(
												$elm$core$String$fromFloat(barX)),
												$elm$svg$Svg$Attributes$y(
												$elm$core$String$fromFloat(barY)),
												$elm$svg$Svg$Attributes$width(
												$elm$core$String$fromFloat(innerBandwidth)),
												$elm$svg$Svg$Attributes$height(
												$elm$core$String$fromFloat(barH)),
												$elm$svg$Svg$Attributes$fill(color),
												$elm$svg$Svg$Attributes$rx(
												$elm$core$String$fromFloat(rx)),
												$elm$svg$Svg$Attributes$ry(
												$elm$core$String$fromFloat(rx))
											]),
										cfg.cp ? _List_fromArray(
											[
												A3(
												$elm$svg$Svg$node,
												'title',
												_List_Nil,
												_List_fromArray(
													[
														$elm$svg$Svg$text(
														cat + (' \u00B7 ' + (series.o + (': ' + $elm$core$String$fromFloat(val)))))
													]))
											]) : _List_Nil),
										A2(
										$elm$svg$Svg$rect,
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$x(
												$elm$core$String$fromFloat(barX)),
												$elm$svg$Svg$Attributes$y(
												$elm$core$String$fromFloat(barY + rx)),
												$elm$svg$Svg$Attributes$width(
												$elm$core$String$fromFloat(innerBandwidth)),
												$elm$svg$Svg$Attributes$height(
												$elm$core$String$fromFloat(
													A2($elm$core$Basics$max, 0, barH - rx))),
												$elm$svg$Svg$Attributes$fill(color)
											]),
										_List_Nil)
									]));
						}),
					cfg.a4);
			},
			cfg.bm);
		var gridLines = A2(
			$elm$core$List$map,
			function (tick) {
				var y = A2($author$project$Scale$convert, yScale, tick);
				return A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x1('0'),
							$elm$svg$Svg$Attributes$x2(
							$elm$core$String$fromInt(innerW)),
							$elm$svg$Svg$Attributes$y1(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$y2(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$stroke(gridColor),
							$elm$svg$Svg$Attributes$strokeWidth('1'),
							$elm$svg$Svg$Attributes$strokeDasharray('4,4')
						]),
					_List_Nil);
			},
			A2($author$project$Scale$ticks, yScale, 5));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(cfg.aB)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(cfg.as)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(cfg.aB) + (' ' + $elm$core$String$fromInt(cfg.as)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + ('; font-size: 12px; fill: ' + (labelColor + ';'))))
						]),
					_List_fromArray(
						[
							(cfg.H !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt((cfg.aB / 2) | 0)),
									$elm$svg$Svg$Attributes$y('20'),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('14'),
									$elm$svg$Svg$Attributes$fontWeight('600'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.H)
								])) : $elm$svg$Svg$text(''),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(padLeft) + (',' + ($elm$core$String$fromInt(padTop) + ')'))))
								]),
							_Utils_ap(
								gridLines,
								_Utils_ap(
									bars,
									_List_fromArray(
										[
											A2(
											$elm$svg$Svg$g,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$transform(
													'translate(0,' + ($elm$core$String$fromInt(innerH) + ')'))
												]),
											_List_fromArray(
												[
													A2(
													$author$project$Axis$bottom,
													_List_Nil,
													A2($author$project$Scale$toRenderable, $elm$core$Basics$identity, outerScale))
												])),
											A2(
											$elm$svg$Svg$g,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$author$project$Axis$left,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(5)
														]),
													yScale)
												]))
										])))),
							(cfg.be !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt(padLeft + ((innerW / 2) | 0))),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromInt(cfg.as - 8)),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.be)
								])) : $elm$svg$Svg$text(''),
							(cfg.bg !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'rotate(-90) translate(-' + ($elm$core$String$fromInt(padTop + ((innerH / 2) | 0)) + ',14)')),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.bg)
								])) : $elm$svg$Svg$text(''),
							(!$elm$core$List$isEmpty(legendItems)) ? A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(legendX) + (',' + ($elm$core$String$fromInt(cfg.as - 12) + ')'))))
								]),
							legendItems) : $elm$svg$Svg$text('')
						]))
				]));
	}
};
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $author$project$PF6$Charts$Theme$primaryColor = function (_v0) {
	var c = _v0;
	return c.aj;
};
var $author$project$PF6$Charts$Theme$seriesColor = F2(
	function (idx, _v0) {
		var c = _v0;
		return A2(
			$elm$core$Maybe$withDefault,
			c.aj,
			$elm$core$List$head(
				A2($elm$core$List$drop, idx, c.a4)));
	});
var $author$project$PF6$Charts$BoxPlot$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return A2($author$project$PF6$Charts$Internal$Skeleton$view, cfg.aB, cfg.as);
	} else {
		var primaryColor = $author$project$PF6$Charts$Theme$primaryColor(cfg.aO);
		var padTop = (cfg.H !== '') ? 40 : 20;
		var padRight = 20;
		var padLeft = (cfg.bg !== '') ? 65 : 50;
		var padBottom = (cfg.be !== '') ? 55 : 40;
		var labels = A2(
			$elm$core$List$map,
			function ($) {
				return $.o;
			},
			cfg.b0);
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var innerW = (cfg.aB - padLeft) - padRight;
		var xScale = A3(
			$author$project$Scale$band,
			{dP: 0.5, ep: 0.3, eq: 0.2},
			_Utils_Tuple2(0, innerW),
			labels);
		var innerH = (cfg.as - padTop) - padBottom;
		var gridColor = $author$project$PF6$Charts$Theme$gridColor(cfg.aO);
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var bw = $author$project$Scale$bandwidth(xScale);
		var allValues = A2(
			$elm$core$List$concatMap,
			function (d) {
				return _List_fromArray(
					[d.cd, d.cj, d.cb, d.ck, d.ca]);
			},
			cfg.b0);
		var yMax = A2(
			$elm$core$Maybe$withDefault,
			100,
			$elm$core$List$maximum(allValues));
		var yMin = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(allValues));
		var yPad = (yMax - yMin) * 0.1;
		var yScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(innerH, 0),
			_Utils_Tuple2(yMin - yPad, yMax + yPad));
		var boxes = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, d) {
					var yQ3 = A2($author$project$Scale$convert, yScale, d.ck);
					var yQ1 = A2($author$project$Scale$convert, yScale, d.cj);
					var yMin_ = A2($author$project$Scale$convert, yScale, d.cd);
					var yMed = A2($author$project$Scale$convert, yScale, d.cb);
					var yMax_ = A2($author$project$Scale$convert, yScale, d.ca);
					var whiskerW = bw * 0.4;
					var cx = A2($author$project$Scale$convert, xScale, d.o) + (bw / 2);
					var color = A2($author$project$PF6$Charts$Theme$seriesColor, idx, cfg.aO);
					return A2(
						$elm$svg$Svg$g,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$line,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x1(
										$elm$core$String$fromFloat(cx)),
										$elm$svg$Svg$Attributes$x2(
										$elm$core$String$fromFloat(cx)),
										$elm$svg$Svg$Attributes$y1(
										$elm$core$String$fromFloat(yMax_)),
										$elm$svg$Svg$Attributes$y2(
										$elm$core$String$fromFloat(yMin_)),
										$elm$svg$Svg$Attributes$stroke(color),
										$elm$svg$Svg$Attributes$strokeWidth('1.5')
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$line,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x1(
										$elm$core$String$fromFloat(cx - (whiskerW / 2))),
										$elm$svg$Svg$Attributes$x2(
										$elm$core$String$fromFloat(cx + (whiskerW / 2))),
										$elm$svg$Svg$Attributes$y1(
										$elm$core$String$fromFloat(yMin_)),
										$elm$svg$Svg$Attributes$y2(
										$elm$core$String$fromFloat(yMin_)),
										$elm$svg$Svg$Attributes$stroke(color),
										$elm$svg$Svg$Attributes$strokeWidth('1.5')
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$line,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x1(
										$elm$core$String$fromFloat(cx - (whiskerW / 2))),
										$elm$svg$Svg$Attributes$x2(
										$elm$core$String$fromFloat(cx + (whiskerW / 2))),
										$elm$svg$Svg$Attributes$y1(
										$elm$core$String$fromFloat(yMax_)),
										$elm$svg$Svg$Attributes$y2(
										$elm$core$String$fromFloat(yMax_)),
										$elm$svg$Svg$Attributes$stroke(color),
										$elm$svg$Svg$Attributes$strokeWidth('1.5')
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$rect,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(cx - (bw / 2))),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromFloat(yQ3)),
										$elm$svg$Svg$Attributes$width(
										$elm$core$String$fromFloat(bw)),
										$elm$svg$Svg$Attributes$height(
										$elm$core$String$fromFloat(yQ1 - yQ3)),
										$elm$svg$Svg$Attributes$fill(color),
										$elm$svg$Svg$Attributes$fillOpacity('0.2'),
										$elm$svg$Svg$Attributes$stroke(color),
										$elm$svg$Svg$Attributes$strokeWidth('1.5'),
										$elm$svg$Svg$Attributes$rx('2')
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$line,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x1(
										$elm$core$String$fromFloat(cx - (bw / 2))),
										$elm$svg$Svg$Attributes$x2(
										$elm$core$String$fromFloat(cx + (bw / 2))),
										$elm$svg$Svg$Attributes$y1(
										$elm$core$String$fromFloat(yMed)),
										$elm$svg$Svg$Attributes$y2(
										$elm$core$String$fromFloat(yMed)),
										$elm$svg$Svg$Attributes$stroke(color),
										$elm$svg$Svg$Attributes$strokeWidth('2.5')
									]),
								_List_Nil)
							]));
				}),
			cfg.b0);
		var gridLines = A2(
			$elm$core$List$map,
			function (tick) {
				var y = A2($author$project$Scale$convert, yScale, tick);
				return A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x1('0'),
							$elm$svg$Svg$Attributes$x2(
							$elm$core$String$fromInt(innerW)),
							$elm$svg$Svg$Attributes$y1(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$y2(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$stroke(gridColor),
							$elm$svg$Svg$Attributes$strokeWidth('1'),
							$elm$svg$Svg$Attributes$strokeDasharray('4,4')
						]),
					_List_Nil);
			},
			A2($author$project$Scale$ticks, yScale, 5));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(cfg.aB)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(cfg.as)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(cfg.aB) + (' ' + $elm$core$String$fromInt(cfg.as)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + ('; font-size: 12px; fill: ' + (labelColor + ';'))))
						]),
					_List_fromArray(
						[
							(cfg.H !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt((cfg.aB / 2) | 0)),
									$elm$svg$Svg$Attributes$y('20'),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('14'),
									$elm$svg$Svg$Attributes$fontWeight('600'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.H)
								])) : $elm$svg$Svg$text(''),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(padLeft) + (',' + ($elm$core$String$fromInt(padTop) + ')'))))
								]),
							_Utils_ap(
								gridLines,
								_Utils_ap(
									boxes,
									_List_fromArray(
										[
											A2(
											$elm$svg$Svg$g,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$transform(
													'translate(0,' + ($elm$core$String$fromInt(innerH) + ')'))
												]),
											_List_fromArray(
												[
													A2(
													$author$project$Axis$bottom,
													_List_Nil,
													A2($author$project$Scale$toRenderable, $elm$core$Basics$identity, xScale))
												])),
											A2(
											$elm$svg$Svg$g,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$author$project$Axis$left,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(5)
														]),
													yScale)
												]))
										])))),
							(cfg.be !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt(padLeft + ((innerW / 2) | 0))),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromInt(cfg.as - 8)),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.be)
								])) : $elm$svg$Svg$text(''),
							(cfg.bg !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'rotate(-90) translate(-' + ($elm$core$String$fromInt(padTop + ((innerH / 2) | 0)) + ',14)')),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.bg)
								])) : $elm$svg$Svg$text('')
						]))
				]));
	}
};
var $elm$svg$Svg$Attributes$opacity = _VirtualDom_attribute('opacity');
var $author$project$Axis$TickFormat = function (a) {
	return {$: 1, a: a};
};
var $author$project$Axis$tickFormat = $author$project$Axis$TickFormat;
var $author$project$PF6$Charts$Bullet$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return A2($author$project$PF6$Charts$Internal$Skeleton$view, cfg.aB, cfg.as);
	} else {
		var titleWidth = (cfg.H !== '') ? 90 : 0;
		var rangeAlpha3 = 0.35;
		var rangeAlpha2 = 0.25;
		var rangeAlpha1 = 0.15;
		var range2End = cfg.ca * 0.75;
		var range1End = cfg.ca * 0.5;
		var padTop = 20;
		var padRight = 20;
		var padLeft = titleWidth + 10;
		var padBottom = 35;
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var innerW = (cfg.aB - padLeft) - padRight;
		var range3W = innerW;
		var scale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(0, innerW),
			_Utils_Tuple2(0, cfg.ca));
		var range1W = A2($author$project$Scale$convert, scale, range1End);
		var range2W = A2($author$project$Scale$convert, scale, range2End);
		var targetX = A2($author$project$Scale$convert, scale, cfg.fT);
		var innerH = (cfg.as - padTop) - padBottom;
		var rangeH = innerH * 0.8;
		var rangeY = (innerH / 2) - (rangeH / 2);
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var barH = innerH * 0.45;
		var barY = (innerH / 2) - (barH / 2);
		var actualW = A2($author$project$Scale$convert, scale, cfg.cv);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(cfg.aB)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(cfg.as)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(cfg.aB) + (' ' + $elm$core$String$fromInt(cfg.as)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + ('; font-size: 12px; fill: ' + (labelColor + ';'))))
						]),
					_List_fromArray(
						[
							(cfg.H !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt((titleWidth / 2) | 0)),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromInt(((cfg.as / 2) | 0) - 4)),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('13'),
									$elm$svg$Svg$Attributes$fontWeight('600'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.H)
								])) : $elm$svg$Svg$text(''),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(padLeft) + (',' + ($elm$core$String$fromInt(padTop) + ')'))))
								]),
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$rect,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$x('0'),
											$elm$svg$Svg$Attributes$y(
											$elm$core$String$fromFloat(rangeY)),
											$elm$svg$Svg$Attributes$width(
											$elm$core$String$fromFloat(range1W)),
											$elm$svg$Svg$Attributes$height(
											$elm$core$String$fromFloat(rangeH)),
											$elm$svg$Svg$Attributes$fill($author$project$PF6$Charts$Colors$primary),
											$elm$svg$Svg$Attributes$opacity(
											$elm$core$String$fromFloat(rangeAlpha1)),
											$elm$svg$Svg$Attributes$rx('2')
										]),
									_List_Nil),
									A2(
									$elm$svg$Svg$rect,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$x(
											$elm$core$String$fromFloat(range1W)),
											$elm$svg$Svg$Attributes$y(
											$elm$core$String$fromFloat(rangeY)),
											$elm$svg$Svg$Attributes$width(
											$elm$core$String$fromFloat(range2W - range1W)),
											$elm$svg$Svg$Attributes$height(
											$elm$core$String$fromFloat(rangeH)),
											$elm$svg$Svg$Attributes$fill($author$project$PF6$Charts$Colors$primary),
											$elm$svg$Svg$Attributes$opacity(
											$elm$core$String$fromFloat(rangeAlpha2))
										]),
									_List_Nil),
									A2(
									$elm$svg$Svg$rect,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$x(
											$elm$core$String$fromFloat(range2W)),
											$elm$svg$Svg$Attributes$y(
											$elm$core$String$fromFloat(rangeY)),
											$elm$svg$Svg$Attributes$width(
											$elm$core$String$fromFloat(range3W - range2W)),
											$elm$svg$Svg$Attributes$height(
											$elm$core$String$fromFloat(rangeH)),
											$elm$svg$Svg$Attributes$fill($author$project$PF6$Charts$Colors$primary),
											$elm$svg$Svg$Attributes$opacity(
											$elm$core$String$fromFloat(rangeAlpha3)),
											$elm$svg$Svg$Attributes$rx('2')
										]),
									_List_Nil),
									A2(
									$elm$svg$Svg$rect,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$x('0'),
											$elm$svg$Svg$Attributes$y(
											$elm$core$String$fromFloat(barY)),
											$elm$svg$Svg$Attributes$width(
											$elm$core$String$fromFloat(actualW)),
											$elm$svg$Svg$Attributes$height(
											$elm$core$String$fromFloat(barH)),
											$elm$svg$Svg$Attributes$fill($author$project$PF6$Charts$Colors$primary),
											$elm$svg$Svg$Attributes$rx('2')
										]),
									_List_Nil),
									A2(
									$elm$svg$Svg$line,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$x1(
											$elm$core$String$fromFloat(targetX)),
											$elm$svg$Svg$Attributes$x2(
											$elm$core$String$fromFloat(targetX)),
											$elm$svg$Svg$Attributes$y1(
											$elm$core$String$fromFloat(rangeY - 4)),
											$elm$svg$Svg$Attributes$y2(
											$elm$core$String$fromFloat((rangeY + rangeH) + 4)),
											$elm$svg$Svg$Attributes$stroke(labelColor),
											$elm$svg$Svg$Attributes$strokeWidth('3')
										]),
									_List_Nil),
									A2(
									$elm$svg$Svg$g,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$transform(
											'translate(0,' + ($elm$core$String$fromInt(innerH) + ')'))
										]),
									_List_fromArray(
										[
											A2(
											$author$project$Axis$bottom,
											_List_fromArray(
												[
													$author$project$Axis$tickCount(5),
													$author$project$Axis$tickFormat(
													function (v) {
														return _Utils_ap(
															$elm$core$String$fromFloat(v),
															cfg.cs);
													})
												]),
											scale)
										]))
								]))
						]))
				]));
	}
};
var $elm$core$Basics$acos = _Basics_acos;
var $folkertdev$one_true_path_experiment$LowLevel$Command$arcTo = $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$LargestArc = 1;
var $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc = 1;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$SmallestArc = 0;
var $folkertdev$one_true_path_experiment$LowLevel$Command$smallestArc = 0;
var $author$project$Shape$Pie$boolToArc = function (b) {
	return b ? $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc : $folkertdev$one_true_path_experiment$LowLevel$Command$smallestArc;
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$Clockwise = 0;
var $folkertdev$one_true_path_experiment$LowLevel$Command$clockwise = 0;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$CounterClockwise = 1;
var $folkertdev$one_true_path_experiment$LowLevel$Command$counterClockwise = 1;
var $author$project$Shape$Pie$boolToDirection = function (b) {
	return b ? $folkertdev$one_true_path_experiment$LowLevel$Command$counterClockwise : $folkertdev$one_true_path_experiment$LowLevel$Command$clockwise;
};
var $elm$core$Basics$cos = _Basics_cos;
var $author$project$Shape$Pie$epsilon = 1.0e-12;
var $elm$core$Basics$truncate = _Basics_truncate;
var $author$project$Shape$Pie$mod = F2(
	function (a, b) {
		var frac = a / b;
		return (frac - (frac | 0)) * b;
	});
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$sin = _Basics_sin;
var $author$project$Shape$Pie$arc_ = F6(
	function (x, y, radius, a0, a1, ccw) {
		var r = $elm$core$Basics$abs(radius);
		if (!r) {
			return $folkertdev$one_true_path_experiment$SubPath$empty;
		} else {
			var tau = 2 * $elm$core$Basics$pi;
			var dy = r * $elm$core$Basics$sin(a0);
			var y0_ = y + dy;
			var dx = r * $elm$core$Basics$cos(a0);
			var x0_ = x + dx;
			var origin = $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
				_Utils_Tuple2(x0_, y0_));
			var da = ccw ? (a0 - a1) : (a1 - a0);
			var cw = $author$project$Shape$Pie$boolToDirection(!ccw);
			if (_Utils_cmp(da, tau - $author$project$Shape$Pie$epsilon) > 0) {
				return A2(
					$folkertdev$one_true_path_experiment$SubPath$with,
					origin,
					_List_fromArray(
						[
							$folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									cw: $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc,
									cC: cw,
									fH: _Utils_Tuple2(r, r),
									fT: _Utils_Tuple2(x - dx, y - dy),
									dI: 0
								}
								])),
							$folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									cw: $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc,
									cC: cw,
									fH: _Utils_Tuple2(r, r),
									fT: _Utils_Tuple2(x0_, y0_),
									dI: 0
								}
								]))
						]));
			} else {
				var da_ = (da < 0) ? (A2($author$project$Shape$Pie$mod, da, tau) + tau) : da;
				return A2(
					$folkertdev$one_true_path_experiment$SubPath$with,
					origin,
					_List_fromArray(
						[
							$folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									cw: $author$project$Shape$Pie$boolToArc(
										_Utils_cmp(da_, $elm$core$Basics$pi) > -1),
									cC: cw,
									fH: _Utils_Tuple2(r, r),
									fT: _Utils_Tuple2(
										x + (r * $elm$core$Basics$cos(a1)),
										y + (r * $elm$core$Basics$sin(a1))),
									dI: 0
								}
								]))
						]));
			}
		}
	});
var $elm$core$Basics$atan2 = _Basics_atan2;
var $folkertdev$one_true_path_experiment$LowLevel$Command$closePath = $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath;
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $folkertdev$elm_deque$Internal$popBack = function (deque) {
	var front = deque.S;
	var rear = deque.T;
	var _v0 = _Utils_Tuple2(front, rear);
	if (!_v0.b.b) {
		if (!_v0.a.b) {
			return _Utils_Tuple2($elm$core$Maybe$Nothing, $folkertdev$elm_deque$Internal$empty);
		} else {
			if (!_v0.a.b.b) {
				var _v1 = _v0.a;
				var x = _v1.a;
				return _Utils_Tuple2(
					$elm$core$Maybe$Just(x),
					$folkertdev$elm_deque$Internal$empty);
			} else {
				return _Utils_Tuple2($elm$core$Maybe$Nothing, $folkertdev$elm_deque$Internal$empty);
			}
		}
	} else {
		var _v2 = _v0.b;
		var r = _v2.a;
		var rs = _v2.b;
		return _Utils_Tuple2(
			$elm$core$Maybe$Just(r),
			$folkertdev$elm_deque$Internal$rebalance(
				{S: deque.S, T: rs, M: deque.M, N: deque.N - 1}));
	}
};
var $folkertdev$elm_deque$Deque$popBack = A2(
	$elm$core$Basics$composeL,
	A2(
		$elm$core$Basics$composeL,
		$elm$core$Tuple$mapSecond($elm$core$Basics$identity),
		$folkertdev$elm_deque$Internal$popBack),
	$folkertdev$elm_deque$Deque$unwrap);
var $folkertdev$one_true_path_experiment$SubPath$close = function (subpath) {
	if (subpath.$ === 1) {
		return $folkertdev$one_true_path_experiment$SubPath$Empty;
	} else {
		var moveto = subpath.a.fv;
		var drawtos = subpath.a.fa;
		var _v1 = $folkertdev$elm_deque$Deque$popBack(drawtos);
		if ((!_v1.a.$) && (_v1.a.a.$ === 4)) {
			var _v2 = _v1.a.a;
			var preceding = _v1.b;
			return subpath;
		} else {
			return $folkertdev$one_true_path_experiment$SubPath$SubPath(
				{
					fa: A2($folkertdev$elm_deque$Deque$pushBack, $folkertdev$one_true_path_experiment$LowLevel$Command$closePath, drawtos),
					fv: moveto
				});
		}
	}
};
var $author$project$Shape$Pie$cornerTangents = F7(
	function (x0, y0, x1, y1, r1, rc, cw) {
		var y01 = y0 - y1;
		var x01 = x0 - x1;
		var r = r1 - rc;
		var lo = (cw ? rc : (-rc)) / $elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, x01, 2) + A2($elm$core$Basics$pow, y01, 2));
		var ox = lo * y01;
		var x10 = x1 + ox;
		var x11 = x0 + ox;
		var x00 = (x11 + x10) / 2;
		var oy = (-lo) * x01;
		var y10 = y1 + oy;
		var y11 = y0 + oy;
		var y00 = (y11 + y10) / 2;
		var dy = y10 - y11;
		var dx = x10 - x11;
		var dd = (x11 * y10) - (x10 * y11);
		var d2 = A2($elm$core$Basics$pow, dx, 2) + A2($elm$core$Basics$pow, dy, 2);
		var d = ((dy < 0) ? (-1) : 1) * $elm$core$Basics$sqrt(
			A2(
				$elm$core$Basics$max,
				0,
				(A2($elm$core$Basics$pow, r, 2) * d2) - A2($elm$core$Basics$pow, dd, 2)));
		var cy1 = (((-dd) * dx) + (dy * d)) / d2;
		var dy1 = cy1 - y00;
		var cy0 = (((-dd) * dx) - (dy * d)) / d2;
		var dy0 = cy0 - y00;
		var cx1 = ((dd * dy) + (dx * d)) / d2;
		var dx1 = cx1 - x00;
		var cx0 = ((dd * dy) - (dx * d)) / d2;
		var dx0 = cx0 - x00;
		var _v0 = (_Utils_cmp(
			A2($elm$core$Basics$pow, dx0, 2) + A2($elm$core$Basics$pow, dy0, 2),
			A2($elm$core$Basics$pow, dx1, 2) + A2($elm$core$Basics$pow, dy1, 2)) > 0) ? _Utils_Tuple2(cx1, cy1) : _Utils_Tuple2(cx0, cy0);
		var fcx = _v0.a;
		var fxy = _v0.b;
		return {J: fcx, K: fxy, X: -ox, ao: fcx * ((r1 / r) - 1), Y: -oy, ap: fxy * ((r1 / r) - 1)};
	});
var $author$project$Shape$Pie$intersect = F8(
	function (x0, y0, x1, y1, x2, y2, x3, y3) {
		var y32 = y3 - y2;
		var y10 = y1 - y0;
		var x32 = x3 - x2;
		var x10 = x1 - x0;
		var t = ((x32 * (y0 - y2)) - (y32 * (x0 - x2))) / ((y32 * x10) - (x32 * y10));
		return _Utils_Tuple2(x0 + (t * x10), y0 + (t * y10));
	});
var $folkertdev$elm_deque$Internal$foldl = F3(
	function (f, initial, deque) {
		return function (initial_) {
			return A3($elm$core$List$foldr, f, initial_, deque.T);
		}(
			A3($elm$core$List$foldl, f, initial, deque.S));
	});
var $folkertdev$elm_deque$Deque$foldl = F2(
	function (f, initial) {
		return A2(
			$elm$core$Basics$composeL,
			A2($folkertdev$elm_deque$Internal$foldl, f, initial),
			$folkertdev$elm_deque$Deque$unwrap);
	});
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$updateCursorState = F2(
	function (drawto, state) {
		var noControlPoint = function (currentState) {
			return _Utils_update(
				currentState,
				{z: $elm$core$Maybe$Nothing});
		};
		var maybeUpdateCursor = function (coordinate) {
			return _Utils_update(
				state,
				{
					k: A2($elm$core$Maybe$withDefault, state.k, coordinate)
				});
		};
		var _v0 = state.k;
		var cursorX = _v0.a;
		var cursorY = _v0.b;
		switch (drawto.$) {
			case 0:
				var coordinates = drawto.a;
				return noControlPoint(
					maybeUpdateCursor(
						$elm_community$list_extra$List$Extra$last(coordinates)));
			case 1:
				var coordinates = drawto.a;
				var _v2 = $elm_community$list_extra$List$Extra$last(coordinates);
				if (_v2.$ === 1) {
					return state;
				} else {
					var _v3 = _v2.a;
					var control1 = _v3.a;
					var control2 = _v3.b;
					var target = _v3.c;
					return _Utils_update(
						state,
						{
							k: target,
							z: $elm$core$Maybe$Just(control2)
						});
				}
			case 2:
				var coordinates = drawto.a;
				var _v4 = $elm_community$list_extra$List$Extra$last(coordinates);
				if (_v4.$ === 1) {
					return state;
				} else {
					var _v5 = _v4.a;
					var control = _v5.a;
					var target = _v5.b;
					return _Utils_update(
						state,
						{
							k: target,
							z: $elm$core$Maybe$Just(control)
						});
				}
			case 3:
				var _arguments = drawto.a;
				return noControlPoint(
					maybeUpdateCursor(
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.fT;
							},
							$elm_community$list_extra$List$Extra$last(_arguments))));
			default:
				return noControlPoint(state);
		}
	});
var $folkertdev$one_true_path_experiment$SubPath$finalCursorState = function (_v0) {
	var moveto = _v0.fv;
	var drawtos = _v0.fa;
	var _v1 = moveto;
	var start = _v1;
	var initial = {k: start, z: $elm$core$Maybe$Nothing, dw: start};
	return A3($folkertdev$elm_deque$Deque$foldl, $folkertdev$one_true_path_experiment$LowLevel$Command$updateCursorState, initial, drawtos);
};
var $folkertdev$one_true_path_experiment$SubPath$finalPoint = A2(
	$elm$core$Basics$composeR,
	$folkertdev$one_true_path_experiment$SubPath$finalCursorState,
	function ($) {
		return $.k;
	});
var $folkertdev$elm_deque$Internal$map = F2(
	function (f, deque) {
		return {
			S: A2($elm$core$List$map, f, deque.S),
			T: A2($elm$core$List$map, f, deque.T),
			M: deque.M,
			N: deque.N
		};
	});
var $folkertdev$elm_deque$Deque$map = function (f) {
	return $folkertdev$elm_deque$Deque$mapAbstract(
		$folkertdev$elm_deque$Internal$map(f));
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple2 = F2(
	function (f, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		return _Utils_Tuple2(
			f(a),
			f(b));
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple3 = F2(
	function (f, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		return _Utils_Tuple3(
			f(a),
			f(b),
			f(c));
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$mapCoordinateDrawTo = F2(
	function (f, drawto) {
		switch (drawto.$) {
			case 0:
				var coordinates = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo(
					A2($elm$core$List$map, f, coordinates));
			case 1:
				var coordinates = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo(
					A2(
						$elm$core$List$map,
						$folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple3(f),
						coordinates));
			case 2:
				var coordinates = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo(
					A2(
						$elm$core$List$map,
						$folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple2(f),
						coordinates));
			case 3:
				var _arguments = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc(
					A2(
						$elm$core$List$map,
						function (argument) {
							return _Utils_update(
								argument,
								{
									fT: f(argument.fT)
								});
						},
						_arguments));
			default:
				return $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath;
		}
	});
var $folkertdev$one_true_path_experiment$SubPath$mapCoordinateInstructions = F2(
	function (f, _v0) {
		var moveto = _v0.fv;
		var drawtos = _v0.fa;
		var coordinate = moveto;
		return {
			fa: A2(
				$folkertdev$elm_deque$Deque$map,
				$folkertdev$one_true_path_experiment$LowLevel$Command$mapCoordinateDrawTo(f),
				drawtos),
			fv: f(coordinate)
		};
	});
var $ianmackenzie$elm_geometry$Vector2d$plus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {dG: v1.dG + v2.dG, dJ: v1.dJ + v2.dJ};
	});
var $folkertdev$one_true_path_experiment$SubPath$continue = function () {
	var helper = F2(
		function (right, left) {
			var distance = A2(
				$ianmackenzie$elm_geometry$Vector2d$minus,
				A2(
					$ianmackenzie$elm_geometry$Vector2d$fromTuple,
					$ianmackenzie$elm_units$Quantity$float,
					$folkertdev$one_true_path_experiment$SubPath$firstPoint(right)),
				A2(
					$ianmackenzie$elm_geometry$Vector2d$fromTuple,
					$ianmackenzie$elm_units$Quantity$float,
					$folkertdev$one_true_path_experiment$SubPath$finalPoint(left)));
			var mapper = A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$ianmackenzie$elm_geometry$Vector2d$toTuple($ianmackenzie$elm_units$Quantity$toFloat),
					$ianmackenzie$elm_geometry$Vector2d$plus(distance)),
				$ianmackenzie$elm_geometry$Vector2d$fromTuple($ianmackenzie$elm_units$Quantity$float));
			return $folkertdev$one_true_path_experiment$SubPath$SubPath(
				A2(
					$folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate,
					left,
					A2($folkertdev$one_true_path_experiment$SubPath$mapCoordinateInstructions, mapper, right)));
		});
	return $folkertdev$one_true_path_experiment$SubPath$map2(helper);
}();
var $author$project$Shape$Pie$makeArc = F6(
	function (x, y, radius, a0, a1, ccw) {
		return $folkertdev$one_true_path_experiment$SubPath$continue(
			A6($author$project$Shape$Pie$arc_, x, y, radius, a0, a1, ccw));
	});
var $elm$core$Basics$asin = _Basics_asin;
var $author$project$Shape$Pie$myAsin = function (x) {
	return (x >= 1) ? ($elm$core$Basics$pi / 2) : ((_Utils_cmp(x, -1) < 1) ? ((-$elm$core$Basics$pi) / 2) : $elm$core$Basics$asin(x));
};
var $author$project$Shape$Pie$arc = function (arcData) {
	var _v0 = (_Utils_cmp(arcData.d6, arcData.en) > 0) ? _Utils_Tuple2(arcData.en, arcData.d6) : _Utils_Tuple2(arcData.d6, arcData.en);
	var r0 = _v0.a;
	var r1 = _v0.b;
	if (_Utils_cmp(r1, $author$project$Shape$Pie$epsilon) < 1) {
		return _List_fromArray(
			[
				$folkertdev$one_true_path_experiment$SubPath$close(
				A2(
					$folkertdev$one_true_path_experiment$SubPath$with,
					$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
						_Utils_Tuple2(0, 0)),
					_List_Nil))
			]);
	} else {
		var a1 = arcData.cD - ($elm$core$Basics$pi / 2);
		var a0 = arcData.dx - ($elm$core$Basics$pi / 2);
		var cw = _Utils_cmp(a1, a0) > 0;
		var da = $elm$core$Basics$abs(a1 - a0);
		if (_Utils_cmp(da, (2 * $elm$core$Basics$pi) - $author$project$Shape$Pie$epsilon) > 0) {
			var p = A7(
				$author$project$Shape$Pie$makeArc,
				0,
				0,
				r1,
				a0,
				a1,
				!cw,
				A2(
					$folkertdev$one_true_path_experiment$SubPath$with,
					$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
						_Utils_Tuple2(
							r1 * $elm$core$Basics$cos(a0),
							r1 * $elm$core$Basics$sin(a0))),
					_List_Nil));
			return (_Utils_cmp(r0, $author$project$Shape$Pie$epsilon) > 0) ? _List_fromArray(
				[
					p,
					$folkertdev$one_true_path_experiment$SubPath$close(
					A7(
						$author$project$Shape$Pie$makeArc,
						0,
						0,
						r0,
						a1,
						a0,
						cw,
						A2(
							$folkertdev$one_true_path_experiment$SubPath$with,
							$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
								_Utils_Tuple2(
									r0 * $elm$core$Basics$cos(a1),
									r0 * $elm$core$Basics$sin(a1))),
							_List_Nil)))
				]) : _List_fromArray(
				[
					$folkertdev$one_true_path_experiment$SubPath$close(p)
				]);
		} else {
			var rc = A2(
				$elm$core$Basics$min,
				$elm$core$Basics$abs(r1 - r0) / 2,
				arcData.dU);
			var ap = arcData.c7 / 2;
			var rp = (_Utils_cmp(ap, $author$project$Shape$Pie$epsilon) > 0) ? ((arcData.eo > 0) ? arcData.eo : $elm$core$Basics$sqrt(
				A2($elm$core$Basics$pow, r0, 2) + A2($elm$core$Basics$pow, r1, 2))) : 0;
			var _v1 = function () {
				if (_Utils_cmp(rp, $author$project$Shape$Pie$epsilon) > 0) {
					var p1 = $author$project$Shape$Pie$myAsin(
						(rp / r1) * $elm$core$Basics$sin(ap));
					return (_Utils_cmp(da - (p1 * 2), $author$project$Shape$Pie$epsilon) > 0) ? (cw ? _Utils_Tuple3(a0 + p1, a1 - p1, da - (p1 * 2)) : _Utils_Tuple3(a0 - p1, a1 + p1, da - (p1 * 2))) : _Utils_Tuple3((a0 + a1) / 2, (a0 + a1) / 2, 0);
				} else {
					return _Utils_Tuple3(a0, a1, da);
				}
			}();
			var a01 = _v1.a;
			var a11 = _v1.b;
			var da1 = _v1.c;
			var x01 = r1 * $elm$core$Basics$cos(a01);
			var y01 = r1 * $elm$core$Basics$sin(a01);
			var x11 = r1 * $elm$core$Basics$cos(a11);
			var y11 = r1 * $elm$core$Basics$sin(a11);
			var _v2 = function () {
				if (_Utils_cmp(rp, $author$project$Shape$Pie$epsilon) > 0) {
					var p0 = $author$project$Shape$Pie$myAsin(
						(rp / r0) * $elm$core$Basics$sin(ap));
					return (_Utils_cmp(da - (p0 * 2), $author$project$Shape$Pie$epsilon) > 0) ? (cw ? _Utils_Tuple3(a0 + p0, a1 - p0, da - (p0 * 2)) : _Utils_Tuple3(a0 - p0, a1 + p0, da - (p0 * 2))) : _Utils_Tuple3((a0 + a1) / 2, (a0 + a1) / 2, 0);
				} else {
					return _Utils_Tuple3(a0, a1, da);
				}
			}();
			var a00 = _v2.a;
			var a10 = _v2.b;
			var da0 = _v2.c;
			var x00 = r0 * $elm$core$Basics$cos(a00);
			var y00 = r0 * $elm$core$Basics$sin(a00);
			var x10 = r0 * $elm$core$Basics$cos(a10);
			var y10 = r0 * $elm$core$Basics$sin(a10);
			var _v3 = (_Utils_cmp(da0, $author$project$Shape$Pie$epsilon) > 0) ? A8($author$project$Shape$Pie$intersect, x01, y01, x00, y00, x11, y11, x10, y10) : _Utils_Tuple2(x10, y10);
			var ocx = _v3.a;
			var ocy = _v3.b;
			var _v4 = _Utils_Tuple2(x11 - ocx, y11 - ocy);
			var bx = _v4.a;
			var by = _v4.b;
			var _v5 = _Utils_Tuple2(x01 - ocx, y01 - ocy);
			var ax = _v5.a;
			var ay = _v5.b;
			var _v6 = function () {
				if ((_Utils_cmp(rc, $author$project$Shape$Pie$epsilon) > 0) && (_Utils_cmp(da, $elm$core$Basics$pi) < 0)) {
					var lc = $elm$core$Basics$sqrt(
						A2($elm$core$Basics$pow, ocx, 2) + A2($elm$core$Basics$pow, ocy, 2));
					var kc = 1 / $elm$core$Basics$sin(
						$elm$core$Basics$acos(
							((ax * bx) + (ay * by)) / ($elm$core$Basics$sqrt(
								A2($elm$core$Basics$pow, ax, 2) + A2($elm$core$Basics$pow, ay, 2)) * $elm$core$Basics$sqrt(
								A2($elm$core$Basics$pow, bx, 2) + A2($elm$core$Basics$pow, by, 2)))) / 2);
					return _Utils_Tuple2(
						A2($elm$core$Basics$min, rc, (r0 - lc) / (kc - 1)),
						A2($elm$core$Basics$min, rc, (r1 - lc) / (kc + 1)));
				} else {
					return _Utils_Tuple2(rc, rc);
				}
			}();
			var rc0 = _v6.a;
			var rc1 = _v6.b;
			var outerRing = function () {
				if (_Utils_cmp(da1, $author$project$Shape$Pie$epsilon) < 1) {
					return A2(
						$folkertdev$one_true_path_experiment$SubPath$with,
						$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
							_Utils_Tuple2(x01, y01)),
						_List_Nil);
				} else {
					if (_Utils_cmp(rc1, $author$project$Shape$Pie$epsilon) > 0) {
						var t1 = A7($author$project$Shape$Pie$cornerTangents, x11, y11, x10, y10, r1, rc1, cw);
						var t0 = A7($author$project$Shape$Pie$cornerTangents, x00, y00, x01, y01, r1, rc1, cw);
						var p = A2(
							$folkertdev$one_true_path_experiment$SubPath$with,
							$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
								_Utils_Tuple2(t0.J + t0.X, t0.K + t0.Y)),
							_List_Nil);
						return (_Utils_cmp(rc1, rc) < 0) ? A7(
							$author$project$Shape$Pie$makeArc,
							t0.J,
							t0.K,
							rc1,
							A2($elm$core$Basics$atan2, t0.Y, t0.X),
							A2($elm$core$Basics$atan2, t1.Y, t1.X),
							!cw,
							p) : A7(
							$author$project$Shape$Pie$makeArc,
							t1.J,
							t1.K,
							rc1,
							A2($elm$core$Basics$atan2, t1.ap, t1.ao),
							A2($elm$core$Basics$atan2, t1.Y, t1.X),
							!cw,
							A7(
								$author$project$Shape$Pie$makeArc,
								0,
								0,
								r1,
								A2($elm$core$Basics$atan2, t0.K + t0.ap, t0.J + t0.ao),
								A2($elm$core$Basics$atan2, t1.K + t1.ap, t1.J + t1.ao),
								!cw,
								A7(
									$author$project$Shape$Pie$makeArc,
									t0.J,
									t0.K,
									rc1,
									A2($elm$core$Basics$atan2, t0.Y, t0.X),
									A2($elm$core$Basics$atan2, t0.ap, t0.ao),
									!cw,
									p)));
					} else {
						return A7(
							$author$project$Shape$Pie$makeArc,
							0,
							0,
							r1,
							a01,
							a11,
							!cw,
							A2(
								$folkertdev$one_true_path_experiment$SubPath$with,
								$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(x01, y01)),
								_List_Nil));
					}
				}
			}();
			if ((_Utils_cmp(r0, $author$project$Shape$Pie$epsilon) < 1) || (_Utils_cmp(da0, $author$project$Shape$Pie$epsilon) < 1)) {
				return _List_fromArray(
					[
						$folkertdev$one_true_path_experiment$SubPath$close(
						A2(
							$folkertdev$one_true_path_experiment$SubPath$connect,
							A2(
								$folkertdev$one_true_path_experiment$SubPath$with,
								$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(x10, y10)),
								_List_Nil),
							outerRing))
					]);
			} else {
				if (_Utils_cmp(rc0, $author$project$Shape$Pie$epsilon) > 0) {
					var t1 = A7($author$project$Shape$Pie$cornerTangents, x01, y01, x00, y00, r0, -rc0, cw);
					var t0 = A7($author$project$Shape$Pie$cornerTangents, x10, y10, x11, y11, r0, -rc0, cw);
					var p = A2(
						$folkertdev$one_true_path_experiment$SubPath$connect,
						A2(
							$folkertdev$one_true_path_experiment$SubPath$with,
							$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
								_Utils_Tuple2(t0.J + t0.X, t0.K + t0.Y)),
							_List_Nil),
						outerRing);
					return (_Utils_cmp(rc0, rc) < 0) ? _List_fromArray(
						[
							$folkertdev$one_true_path_experiment$SubPath$close(
							A7(
								$author$project$Shape$Pie$makeArc,
								t0.J,
								t0.K,
								rc0,
								A2($elm$core$Basics$atan2, t0.Y, t0.X),
								A2($elm$core$Basics$atan2, t1.Y, t1.X),
								!cw,
								p))
						]) : _List_fromArray(
						[
							$folkertdev$one_true_path_experiment$SubPath$close(
							A7(
								$author$project$Shape$Pie$makeArc,
								t1.J,
								t1.K,
								rc0,
								A2($elm$core$Basics$atan2, t1.ap, t1.ao),
								A2($elm$core$Basics$atan2, t1.Y, t1.X),
								!cw,
								A7(
									$author$project$Shape$Pie$makeArc,
									0,
									0,
									r0,
									A2($elm$core$Basics$atan2, t0.K + t0.ap, t0.J + t0.ao),
									A2($elm$core$Basics$atan2, t1.K + t1.ap, t1.J + t1.ao),
									cw,
									A7(
										$author$project$Shape$Pie$makeArc,
										t0.J,
										t0.K,
										rc0,
										A2($elm$core$Basics$atan2, t0.Y, t0.X),
										A2($elm$core$Basics$atan2, t0.ap, t0.ao),
										!cw,
										p))))
						]);
				} else {
					return _List_fromArray(
						[
							$folkertdev$one_true_path_experiment$SubPath$close(
							A2(
								$folkertdev$one_true_path_experiment$SubPath$connect,
								A6($author$project$Shape$Pie$arc_, 0, 0, r0, a10, a00, cw),
								outerRing))
						]);
				}
			}
		}
	}
};
var $author$project$Shape$arc = $author$project$Shape$Pie$arc;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{w: nodeList, p: nodeListSize, s: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$List$sortWith = _List_sortWith;
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Shape$Pie$pie = F2(
	function (settings, data) {
		var unsafeGet = F2(
			function (index, array) {
				unsafeGet:
				while (true) {
					var _v0 = A2($elm$core$Array$get, index, array);
					if (!_v0.$) {
						var v = _v0.a;
						return v;
					} else {
						var $temp$index = index,
							$temp$array = array;
						index = $temp$index;
						array = $temp$array;
						continue unsafeGet;
					}
				}
			});
		var summer = F2(
			function (a, b) {
				var v = settings.f_(a);
				return (v > 0) ? (v + b) : b;
			});
		var sum = A3($elm$core$List$foldr, summer, 0, data);
		var sortedIndices = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$List$map($elm$core$Tuple$first),
				$elm$core$List$sortWith(
					F2(
						function (_v2, _v3) {
							var a = _v2.b;
							var b = _v3.b;
							return A2(settings.fN, a, b);
						}))),
			$elm$core$List$indexedMap($elm$core$Tuple$pair));
		var dataArray = $elm$core$Array$fromList(data);
		var da = A2(
			$elm$core$Basics$min,
			2 * $elm$core$Basics$pi,
			A2($elm$core$Basics$max, (-2) * $elm$core$Basics$pi, settings.cD - settings.dx));
		var p = A2(
			$elm$core$Basics$min,
			$elm$core$Basics$abs(da) / $elm$core$List$length(data),
			settings.c7);
		var pa = p * ((da < 0) ? (-1) : 1);
		var k = (!sum) ? 0 : ((da - ($elm$core$List$length(data) * pa)) / sum);
		var computeValue = F2(
			function (el, angle) {
				var value = settings.f_(el);
				return {
					dU: settings.dU,
					cD: (angle + ((value > 0) ? (value * k) : 0)) + pa,
					d6: settings.d6,
					en: settings.en,
					c7: p,
					eo: settings.eo,
					dx: angle
				};
			});
		var helper = F2(
			function (index, _v1) {
				var angle = _v1.a;
				var result = _v1.b;
				var r = A2(
					computeValue,
					A2(unsafeGet, index, dataArray),
					angle);
				return _Utils_Tuple2(
					r.cD,
					A3($elm$core$Dict$insert, index, r, result));
			});
		return $elm$core$Dict$values(
			A3(
				$elm$core$List$foldl,
				helper,
				_Utils_Tuple2(settings.dx, $elm$core$Dict$empty),
				sortedIndices(data)).b);
	});
var $author$project$Shape$pie = $author$project$Shape$Pie$pie;
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$PF6$Charts$Internal$Skeleton$viewCircle = function (size) {
	var cy = size / 2;
	var cx = size / 2;
	var r = cx - 10;
	var innerR = r * 0.65;
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromInt(size)),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromInt(size)),
				$elm$svg$Svg$Attributes$viewBox(
				'0 0 ' + ($elm$core$String$fromInt(size) + (' ' + $elm$core$String$fromInt(size))))
			]),
		_List_fromArray(
			[
				$author$project$PF6$Charts$Internal$Skeleton$shimmerStyle,
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(cx)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(cy)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(r)),
						$elm$svg$Svg$Attributes$fill('#d2d2d2'),
						$elm$svg$Svg$Attributes$class('pf-skeleton')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(cx)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(cy)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(innerR)),
						$elm$svg$Svg$Attributes$fill('#ffffff')
					]),
				_List_Nil)
			]));
};
var $author$project$PF6$Charts$Colors$white = '#ffffff';
var $author$project$PF6$Charts$Donut$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return $author$project$PF6$Charts$Internal$Skeleton$viewCircle(cfg.bF);
	} else {
		var values = A2(
			$elm$core$List$map,
			function ($) {
				return $.az;
			},
			cfg.b0);
		var totalVal = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.az;
				},
				cfg.b0));
		var titleHeight = (cfg.H !== '') ? 30 : 0;
		var svgSize = cfg.bF;
		var totalHeight = svgSize + titleHeight;
		var seriesColors = _Utils_ap(
			cfg.bX,
			A2($elm$core$List$repeat, 20, $author$project$PF6$Charts$Colors$primary));
		var outerRadius = (svgSize / 2) - 10;
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var legendItems = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, slice) {
					var color = A2(
						$elm$core$Maybe$withDefault,
						$author$project$PF6$Charts$Colors$primary,
						$elm$core$List$head(
							A2($elm$core$List$drop, idx, seriesColors)));
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$transform(
								'translate(0,' + ($elm$core$String$fromInt(idx * 20) + ')'))
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$rect,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$width('12'),
										$elm$svg$Svg$Attributes$height('12'),
										$elm$svg$Svg$Attributes$fill(color),
										$elm$svg$Svg$Attributes$rx('2'),
										$elm$svg$Svg$Attributes$y('-1')
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x('16'),
										$elm$svg$Svg$Attributes$y('10'),
										$elm$svg$Svg$Attributes$fontSize('12'),
										$elm$svg$Svg$Attributes$fill(labelColor)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(slice.o)
									]))
							]));
				}),
			cfg.b0);
		var innerRadius = outerRadius * 0.65;
		var pieArcs = A2(
			$author$project$Shape$pie,
			{
				dU: 2,
				cD: 2 * $elm$core$Basics$pi,
				d6: innerRadius,
				en: outerRadius,
				c7: 0.02,
				eo: 0,
				fN: F2(
					function (_v1, _v2) {
						return 1;
					}),
				dx: 0,
				f_: $elm$core$Basics$identity
			},
			values);
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var cy = svgSize / 2;
		var cx = svgSize / 2;
		var slices = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, arc) {
					var slice = A2(
						$elm$core$Maybe$withDefault,
						{o: '', az: 0},
						$elm$core$List$head(
							A2($elm$core$List$drop, idx, cfg.b0)));
					var pct = (totalVal > 0) ? $elm$core$Basics$round((slice.az / totalVal) * 100) : 0;
					var color = A2(
						$elm$core$Maybe$withDefault,
						$author$project$PF6$Charts$Colors$primary,
						$elm$core$List$head(
							A2($elm$core$List$drop, idx, seriesColors)));
					var arcPath = A2(
						$folkertdev$one_true_path_experiment$Path$element,
						$author$project$Shape$arc(
							{dU: 2, cD: arc.cD, d6: innerRadius, en: outerRadius, c7: arc.c7, eo: 0, dx: arc.dx}),
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$fill(color),
								$elm$svg$Svg$Attributes$stroke($author$project$PF6$Charts$Colors$white),
								$elm$svg$Svg$Attributes$strokeWidth('2'),
								$elm$svg$Svg$Attributes$transform(
								'translate(' + ($elm$core$String$fromFloat(cx) + (',' + ($elm$core$String$fromFloat(cy) + ')'))))
							]));
					return cfg.cp ? A2(
						$elm$svg$Svg$g,
						_List_Nil,
						_List_fromArray(
							[
								arcPath,
								A3(
								$elm$svg$Svg$node,
								'title',
								_List_Nil,
								_List_fromArray(
									[
										$elm$svg$Svg$text(
										slice.o + (': ' + ($elm$core$String$fromFloat(slice.az) + (' (' + ($elm$core$String$fromInt(pct) + '%)')))))
									]))
							])) : arcPath;
				}),
			pieArcs);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(totalHeight)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(totalHeight)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(totalHeight) + (' ' + $elm$core$String$fromInt(totalHeight)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + '; font-size: 12px;'))
						]),
					_Utils_ap(
						slices,
						_List_fromArray(
							[
								(cfg.bo !== '') ? A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(cx)),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromFloat(cy - 4)),
										$elm$svg$Svg$Attributes$textAnchor('middle'),
										$elm$svg$Svg$Attributes$fontSize('24'),
										$elm$svg$Svg$Attributes$fontWeight('700'),
										$elm$svg$Svg$Attributes$fill(labelColor)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(cfg.bo)
									])) : $elm$svg$Svg$text(''),
								(cfg.bn !== '') ? A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(cx)),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromFloat(cy + 18)),
										$elm$svg$Svg$Attributes$textAnchor('middle'),
										$elm$svg$Svg$Attributes$fontSize('12'),
										$elm$svg$Svg$Attributes$fill(labelColor)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(cfg.bn)
									])) : $elm$svg$Svg$text(''),
								(cfg.H !== '') ? A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(cx)),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromInt(svgSize + 20)),
										$elm$svg$Svg$Attributes$textAnchor('middle'),
										$elm$svg$Svg$Attributes$fontSize('13'),
										$elm$svg$Svg$Attributes$fill(labelColor)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(cfg.H)
									])) : $elm$svg$Svg$text('')
							])))
				]));
	}
};
var $author$project$PF6$Charts$DonutUtilization$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return $author$project$PF6$Charts$Internal$Skeleton$viewCircle(cfg.bF);
	} else {
		var trackColor = '#d2d2d2';
		var titleHeight = (cfg.H !== '') ? 30 : 0;
		var svgSize = cfg.bF;
		var totalHeight = svgSize + titleHeight;
		var percent = (cfg.bO > 0) ? ((cfg.ct / cfg.bO) * 100) : 0;
		var percentStr = $elm$core$String$fromInt(
			$elm$core$Basics$round(percent)) + '%';
		var outerRadius = (svgSize / 2) - 10;
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var innerRadius = outerRadius * 0.65;
		var fullAngle = 2 * $elm$core$Basics$pi;
		var trackPath = $author$project$Shape$arc(
			{dU: 2, cD: fullAngle - 0.001, d6: innerRadius, en: outerRadius, c7: 0, eo: 0, dx: 0});
		var usedAngle = (percent / 100) * fullAngle;
		var usedPath = $author$project$Shape$arc(
			{
				dU: 2,
				cD: A2($elm$core$Basics$max, 0.001, usedAngle),
				d6: innerRadius,
				en: outerRadius,
				c7: 0,
				eo: 0,
				dx: 0
			});
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var cy = svgSize / 2;
		var cx = svgSize / 2;
		var arcColor = (_Utils_cmp(percent, cfg.b$) > -1) ? '#c9190b' : ((_Utils_cmp(percent, cfg.cu) > -1) ? '#f0ab00' : $author$project$PF6$Charts$Theme$primaryColor(cfg.aO));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(svgSize)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(totalHeight)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(svgSize) + (' ' + $elm$core$String$fromInt(totalHeight)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + '; font-size: 12px;'))
						]),
					_List_fromArray(
						[
							A2(
							$folkertdev$one_true_path_experiment$Path$element,
							trackPath,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$fill(trackColor),
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromFloat(cx) + (',' + ($elm$core$String$fromFloat(cy) + ')'))))
								])),
							A2(
							$folkertdev$one_true_path_experiment$Path$element,
							usedPath,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$fill(arcColor),
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromFloat(cx) + (',' + ($elm$core$String$fromFloat(cy) + ')'))))
								])),
							A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromFloat(cx)),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromFloat(cy - 4)),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('24'),
									$elm$svg$Svg$Attributes$fontWeight('700'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(percentStr)
								])),
							A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromFloat(cx)),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromFloat(cy + 18)),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('11'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(
									$elm$core$String$fromFloat(cfg.ct) + (' of ' + ($elm$core$String$fromFloat(cfg.bO) + ((cfg.cs !== '') ? (' ' + cfg.cs) : ''))))
								])),
							(cfg.H !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromFloat(cx)),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromInt(svgSize + 20)),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('13'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.H)
								])) : $elm$svg$Svg$text('')
						]))
				]));
	}
};
var $author$project$PF6$Charts$Line$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return A2($author$project$PF6$Charts$Internal$Skeleton$view, cfg.aB, cfg.as);
	} else {
		var padTop = (cfg.H !== '') ? 40 : 20;
		var padRight = 30;
		var padLeft = (cfg.bg !== '') ? 65 : 50;
		var legendWidth = $elm$core$List$length(cfg.a4) * 120;
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var legendItems = ($elm$core$List$length(cfg.a4) > 1) ? A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, series) {
					var xOff = idx * 120;
					var color = A2($author$project$PF6$Charts$Theme$seriesColor, idx, cfg.aO);
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$transform(
								'translate(' + ($elm$core$String$fromInt(xOff) + ',0)'))
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$line,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x1('0'),
										$elm$svg$Svg$Attributes$y1('6'),
										$elm$svg$Svg$Attributes$x2('16'),
										$elm$svg$Svg$Attributes$y2('6'),
										$elm$svg$Svg$Attributes$stroke(color),
										$elm$svg$Svg$Attributes$strokeWidth('2')
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x('20'),
										$elm$svg$Svg$Attributes$y('10'),
										$elm$svg$Svg$Attributes$fontSize('11'),
										$elm$svg$Svg$Attributes$fill(labelColor)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(series.o)
									]))
							]));
				}),
			cfg.a4) : _List_Nil;
		var innerW = (cfg.aB - padLeft) - padRight;
		var legendX = padLeft + A2($elm$core$Basics$max, 0, ((innerW / 2) | 0) - ((legendWidth / 2) | 0));
		var hasLegend = $elm$core$List$length(cfg.a4) > 1;
		var padBottom = ((cfg.be !== '') && hasLegend) ? 75 : ((cfg.be !== '') ? 55 : (hasLegend ? 50 : 40));
		var innerH = (cfg.as - padTop) - padBottom;
		var gridColor = $author$project$PF6$Charts$Theme$gridColor(cfg.aO);
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var allPoints = A2(
			$elm$core$List$concatMap,
			function ($) {
				return $.b0;
			},
			cfg.a4);
		var xs = A2($elm$core$List$map, $elm$core$Tuple$first, allPoints);
		var xMax = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$maximum(xs));
		var xMin = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(xs));
		var xScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(0, innerW),
			_Utils_Tuple2(xMin, xMax));
		var ys = A2($elm$core$List$map, $elm$core$Tuple$second, allPoints);
		var yMax = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$maximum(ys));
		var yScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(innerH, 0),
			_Utils_Tuple2(0, yMax * 1.1));
		var gridLines = A2(
			$elm$core$List$map,
			function (tick) {
				var y = A2($author$project$Scale$convert, yScale, tick);
				return A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x1('0'),
							$elm$svg$Svg$Attributes$x2(
							$elm$core$String$fromInt(innerW)),
							$elm$svg$Svg$Attributes$y1(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$y2(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$stroke(gridColor),
							$elm$svg$Svg$Attributes$strokeWidth('1'),
							$elm$svg$Svg$Attributes$strokeDasharray('4,4')
						]),
					_List_Nil);
			},
			A2($author$project$Scale$ticks, yScale, 5));
		var seriesLines = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, series) {
					var path = A2(
						$author$project$Shape$line,
						$author$project$Shape$monotoneInXCurve,
						A2(
							$elm$core$List$map,
							function (_v1) {
								var x = _v1.a;
								var y = _v1.b;
								return $elm$core$Maybe$Just(
									_Utils_Tuple2(
										A2($author$project$Scale$convert, xScale, x),
										A2($author$project$Scale$convert, yScale, y)));
							},
							series.b0));
					var color = A2($author$project$PF6$Charts$Theme$seriesColor, idx, cfg.aO);
					return A2(
						$folkertdev$one_true_path_experiment$Path$element,
						path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$fill('none'),
								$elm$svg$Svg$Attributes$stroke(color),
								$elm$svg$Svg$Attributes$strokeWidth('2'),
								$elm$svg$Svg$Attributes$strokeLinejoin('round')
							]));
				}),
			cfg.a4);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(cfg.aB)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(cfg.as)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(cfg.aB) + (' ' + $elm$core$String$fromInt(cfg.as)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + ('; font-size: 12px; fill: ' + (labelColor + ';'))))
						]),
					_List_fromArray(
						[
							(cfg.H !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt((cfg.aB / 2) | 0)),
									$elm$svg$Svg$Attributes$y('20'),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('14'),
									$elm$svg$Svg$Attributes$fontWeight('600'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.H)
								])) : $elm$svg$Svg$text(''),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(padLeft) + (',' + ($elm$core$String$fromInt(padTop) + ')'))))
								]),
							_Utils_ap(
								gridLines,
								_Utils_ap(
									seriesLines,
									_List_fromArray(
										[
											A2(
											$elm$svg$Svg$g,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$transform(
													'translate(0,' + ($elm$core$String$fromInt(innerH) + ')'))
												]),
											_List_fromArray(
												[
													A2(
													$author$project$Axis$bottom,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(6)
														]),
													xScale)
												])),
											A2(
											$elm$svg$Svg$g,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$author$project$Axis$left,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(5)
														]),
													yScale)
												]))
										])))),
							(cfg.be !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt(padLeft + ((innerW / 2) | 0))),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromInt(
										cfg.as - (hasLegend ? 30 : 8))),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.be)
								])) : $elm$svg$Svg$text(''),
							(cfg.bg !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'rotate(-90) translate(-' + ($elm$core$String$fromInt(padTop + ((innerH / 2) | 0)) + ',14)')),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.bg)
								])) : $elm$svg$Svg$text(''),
							(!$elm$core$List$isEmpty(legendItems)) ? A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(legendX) + (',' + ($elm$core$String$fromInt(cfg.as - 14) + ')'))))
								]),
							legendItems) : $elm$svg$Svg$text('')
						]))
				]));
	}
};
var $author$project$PF6$Charts$Internal$Skeleton$viewPie = function (size) {
	var cy = size / 2;
	var cx = size / 2;
	var r = cx - 10;
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromInt(size)),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromInt(size)),
				$elm$svg$Svg$Attributes$viewBox(
				'0 0 ' + ($elm$core$String$fromInt(size) + (' ' + $elm$core$String$fromInt(size))))
			]),
		_List_fromArray(
			[
				$author$project$PF6$Charts$Internal$Skeleton$shimmerStyle,
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(cx)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(cy)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat(r)),
						$elm$svg$Svg$Attributes$fill('#d2d2d2'),
						$elm$svg$Svg$Attributes$class('pf-skeleton')
					]),
				_List_Nil)
			]));
};
var $author$project$PF6$Charts$Pie$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return $author$project$PF6$Charts$Internal$Skeleton$viewPie(cfg.bF);
	} else {
		var values = A2(
			$elm$core$List$map,
			function ($) {
				return $.az;
			},
			cfg.b0);
		var totalVal = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.az;
				},
				cfg.b0));
		var titleHeight = (cfg.H !== '') ? 30 : 0;
		var svgSize = cfg.bF;
		var totalHeight = svgSize + titleHeight;
		var seriesColors = _Utils_ap(
			cfg.bX,
			A2($elm$core$List$repeat, 20, $author$project$PF6$Charts$Colors$primary));
		var outerRadius = (svgSize / 2) - 10;
		var pieArcs = A2(
			$author$project$Shape$pie,
			{
				dU: 2,
				cD: 2 * $elm$core$Basics$pi,
				d6: 0,
				en: outerRadius,
				c7: 0.02,
				eo: 0,
				fN: F2(
					function (_v1, _v2) {
						return 1;
					}),
				dx: 0,
				f_: $elm$core$Basics$identity
			},
			values);
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var cy = svgSize / 2;
		var cx = svgSize / 2;
		var slices = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, arc) {
					var slice = A2(
						$elm$core$Maybe$withDefault,
						{o: '', az: 0},
						$elm$core$List$head(
							A2($elm$core$List$drop, idx, cfg.b0)));
					var pct = (totalVal > 0) ? $elm$core$Basics$round((slice.az / totalVal) * 100) : 0;
					var color = A2(
						$elm$core$Maybe$withDefault,
						$author$project$PF6$Charts$Colors$primary,
						$elm$core$List$head(
							A2($elm$core$List$drop, idx, seriesColors)));
					var arcPath = A2(
						$folkertdev$one_true_path_experiment$Path$element,
						$author$project$Shape$arc(
							{dU: 2, cD: arc.cD, d6: 0, en: outerRadius, c7: arc.c7, eo: 0, dx: arc.dx}),
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$fill(color),
								$elm$svg$Svg$Attributes$stroke($author$project$PF6$Charts$Colors$white),
								$elm$svg$Svg$Attributes$strokeWidth('2'),
								$elm$svg$Svg$Attributes$transform(
								'translate(' + ($elm$core$String$fromFloat(cx) + (',' + ($elm$core$String$fromFloat(cy) + ')'))))
							]));
					return cfg.cp ? A2(
						$elm$svg$Svg$g,
						_List_Nil,
						_List_fromArray(
							[
								arcPath,
								A3(
								$elm$svg$Svg$node,
								'title',
								_List_Nil,
								_List_fromArray(
									[
										$elm$svg$Svg$text(
										slice.o + (': ' + ($elm$core$String$fromFloat(slice.az) + (' (' + ($elm$core$String$fromInt(pct) + '%)')))))
									]))
							])) : arcPath;
				}),
			pieArcs);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(totalHeight)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(totalHeight)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(totalHeight) + (' ' + $elm$core$String$fromInt(totalHeight)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + '; font-size: 12px;'))
						]),
					_Utils_ap(
						slices,
						_List_fromArray(
							[
								(cfg.H !== '') ? A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(cx)),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromInt(svgSize + 20)),
										$elm$svg$Svg$Attributes$textAnchor('middle'),
										$elm$svg$Svg$Attributes$fontSize('13'),
										$elm$svg$Svg$Attributes$fill(labelColor)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(cfg.H)
									])) : $elm$svg$Svg$text('')
							])))
				]));
	}
};
var $author$project$PF6$Charts$Scatter$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return A2($author$project$PF6$Charts$Internal$Skeleton$view, cfg.aB, cfg.as);
	} else {
		var padTop = (cfg.H !== '') ? 40 : 20;
		var padRight = 30;
		var padLeft = (cfg.bg !== '') ? 65 : 50;
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var legendItems = ($elm$core$List$length(cfg.a4) > 1) ? A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, series) {
					var xOff = idx * 110;
					var color = A2($author$project$PF6$Charts$Theme$seriesColor, idx, cfg.aO);
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$transform(
								'translate(' + ($elm$core$String$fromInt(xOff) + ',0)'))
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$circle,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$cx('6'),
										$elm$svg$Svg$Attributes$cy('6'),
										$elm$svg$Svg$Attributes$r('5'),
										$elm$svg$Svg$Attributes$fill(color)
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x('14'),
										$elm$svg$Svg$Attributes$y('10'),
										$elm$svg$Svg$Attributes$fontSize('11'),
										$elm$svg$Svg$Attributes$fill(labelColor)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(series.o)
									]))
							]));
				}),
			cfg.a4) : _List_Nil;
		var innerW = (cfg.aB - padLeft) - padRight;
		var legendX = padLeft + A2(
			$elm$core$Basics$max,
			0,
			((innerW / 2) | 0) - ($elm$core$List$length(cfg.a4) * 55));
		var hasLegend = $elm$core$List$length(cfg.a4) > 1;
		var padBottom = ((cfg.be !== '') && hasLegend) ? 75 : ((cfg.be !== '') ? 55 : (hasLegend ? 50 : 40));
		var innerH = (cfg.as - padTop) - padBottom;
		var gridColor = $author$project$PF6$Charts$Theme$gridColor(cfg.aO);
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var allPoints = A2(
			$elm$core$List$concatMap,
			function ($) {
				return $.b0;
			},
			cfg.a4);
		var xs = A2($elm$core$List$map, $elm$core$Tuple$first, allPoints);
		var xMax = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$maximum(xs));
		var xMin = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(xs));
		var xPad = (xMax - xMin) * 0.05;
		var xScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(0, innerW),
			_Utils_Tuple2(xMin - xPad, xMax + xPad));
		var ys = A2($elm$core$List$map, $elm$core$Tuple$second, allPoints);
		var yMax = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$maximum(ys));
		var yMin = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(ys));
		var yPad = (yMax - yMin) * 0.1;
		var yScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(innerH, 0),
			_Utils_Tuple2(yMin - yPad, yMax + yPad));
		var gridLines = A2(
			$elm$core$List$map,
			function (tick) {
				var y = A2($author$project$Scale$convert, yScale, tick);
				return A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x1('0'),
							$elm$svg$Svg$Attributes$x2(
							$elm$core$String$fromInt(innerW)),
							$elm$svg$Svg$Attributes$y1(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$y2(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$stroke(gridColor),
							$elm$svg$Svg$Attributes$strokeWidth('1'),
							$elm$svg$Svg$Attributes$strokeDasharray('4,4')
						]),
					_List_Nil);
			},
			A2($author$project$Scale$ticks, yScale, 5));
		var points = A2(
			$elm$core$List$concatMap,
			function (_v1) {
				var idx = _v1.a;
				var series = _v1.b;
				var color = A2($author$project$PF6$Charts$Theme$seriesColor, idx, cfg.aO);
				return A2(
					$elm$core$List$map,
					function (_v2) {
						var x = _v2.a;
						var y = _v2.b;
						return A2(
							$elm$svg$Svg$circle,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$cx(
									$elm$core$String$fromFloat(
										A2($author$project$Scale$convert, xScale, x))),
									$elm$svg$Svg$Attributes$cy(
									$elm$core$String$fromFloat(
										A2($author$project$Scale$convert, yScale, y))),
									$elm$svg$Svg$Attributes$r(
									$elm$core$String$fromFloat(cfg.ci)),
									$elm$svg$Svg$Attributes$fill(color),
									$elm$svg$Svg$Attributes$opacity('0.8')
								]),
							cfg.cp ? _List_fromArray(
								[
									A3(
									$elm$svg$Svg$node,
									'title',
									_List_Nil,
									_List_fromArray(
										[
											$elm$svg$Svg$text(
											'(' + ($elm$core$String$fromFloat(x) + (', ' + ($elm$core$String$fromFloat(y) + ')'))))
										]))
								]) : _List_Nil);
					},
					series.b0);
			},
			A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, cfg.a4));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(cfg.aB)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(cfg.as)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(cfg.aB) + (' ' + $elm$core$String$fromInt(cfg.as)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + ('; font-size: 12px; fill: ' + (labelColor + ';'))))
						]),
					_List_fromArray(
						[
							(cfg.H !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt((cfg.aB / 2) | 0)),
									$elm$svg$Svg$Attributes$y('20'),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('14'),
									$elm$svg$Svg$Attributes$fontWeight('600'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.H)
								])) : $elm$svg$Svg$text(''),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(padLeft) + (',' + ($elm$core$String$fromInt(padTop) + ')'))))
								]),
							_Utils_ap(
								gridLines,
								_Utils_ap(
									points,
									_List_fromArray(
										[
											A2(
											$elm$svg$Svg$g,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$transform(
													'translate(0,' + ($elm$core$String$fromInt(innerH) + ')'))
												]),
											_List_fromArray(
												[
													A2(
													$author$project$Axis$bottom,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(6)
														]),
													xScale)
												])),
											A2(
											$elm$svg$Svg$g,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$author$project$Axis$left,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(5)
														]),
													yScale)
												]))
										])))),
							(cfg.be !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt(padLeft + ((innerW / 2) | 0))),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromInt(
										cfg.as - (hasLegend ? 30 : 8))),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.be)
								])) : $elm$svg$Svg$text(''),
							(cfg.bg !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'rotate(-90) translate(-' + ($elm$core$String$fromInt(padTop + ((innerH / 2) | 0)) + ',14)')),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.bg)
								])) : $elm$svg$Svg$text(''),
							(!$elm$core$List$isEmpty(legendItems)) ? A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(legendX) + (',' + ($elm$core$String$fromInt(cfg.as - 12) + ')'))))
								]),
							legendItems) : $elm$svg$Svg$text('')
						]))
				]));
	}
};
var $author$project$PF6$Charts$Internal$Skeleton$viewSparkline = F2(
	function (w, h) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromInt(w)),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromInt(h)),
					$elm$svg$Svg$Attributes$viewBox(
					'0 0 ' + ($elm$core$String$fromInt(w) + (' ' + $elm$core$String$fromInt(h))))
				]),
			_List_fromArray(
				[
					$author$project$PF6$Charts$Internal$Skeleton$shimmerStyle,
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x('2'),
							$elm$svg$Svg$Attributes$y('2'),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(w - 4)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(h - 4)),
							$elm$svg$Svg$Attributes$fill('#d2d2d2'),
							$elm$svg$Svg$Attributes$rx('3'),
							$elm$svg$Svg$Attributes$class('pf-skeleton')
						]),
					_List_Nil)
				]));
	});
var $author$project$PF6$Charts$Sparkline$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return A2($author$project$PF6$Charts$Internal$Skeleton$viewSparkline, cfg.aB, cfg.as);
	} else {
		var pad = 2;
		var n = $elm$core$List$length(cfg.b0);
		var innerW = cfg.aB - (pad * 2);
		var xScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(0, innerW),
			_Utils_Tuple2(
				0,
				A2($elm$core$Basics$max, 1, n - 1)));
		var innerH = cfg.as - (pad * 2);
		var indexedData = A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, y) {
					return _Utils_Tuple2(i, y);
				}),
			cfg.b0);
		var ys = A2($elm$core$List$map, $elm$core$Tuple$second, indexedData);
		var yMax = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$maximum(ys));
		var yMin = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(ys));
		var yScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(innerH, 0),
			_Utils_Tuple2(yMin, yMax));
		var toAreaPoint = function (_v2) {
			var x = _v2.a;
			var y = _v2.b;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(
					_Utils_Tuple2(
						A2($author$project$Scale$convert, xScale, x),
						A2($author$project$Scale$convert, yScale, yMin)),
					_Utils_Tuple2(
						A2($author$project$Scale$convert, xScale, x),
						A2($author$project$Scale$convert, yScale, y))));
		};
		var toLinePoint = function (_v1) {
			var x = _v1.a;
			var y = _v1.b;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(
					A2($author$project$Scale$convert, xScale, x),
					A2($author$project$Scale$convert, yScale, y)));
		};
		var linePath = A2(
			$author$project$Shape$line,
			$author$project$Shape$monotoneInXCurve,
			A2($elm$core$List$map, toLinePoint, indexedData));
		var fillColor = A2($author$project$PF6$Charts$Internal$Color$hexToRgba, cfg.aU, 0.15);
		var areaPath = A2(
			$author$project$Shape$area,
			$author$project$Shape$monotoneInXCurve,
			A2($elm$core$List$map, toAreaPoint, indexedData));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(cfg.aB)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(cfg.as)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(cfg.aB) + (' ' + $elm$core$String$fromInt(cfg.as))))
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(pad) + (',' + ($elm$core$String$fromInt(pad) + ')'))))
								]),
							_List_fromArray(
								[
									cfg.b2 ? A2(
									$folkertdev$one_true_path_experiment$Path$element,
									areaPath,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$fill(fillColor),
											$elm$svg$Svg$Attributes$stroke('none')
										])) : $elm$svg$Svg$text(''),
									A2(
									$folkertdev$one_true_path_experiment$Path$element,
									linePath,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$fill('none'),
											$elm$svg$Svg$Attributes$stroke(cfg.aU),
											$elm$svg$Svg$Attributes$strokeWidth('1.5'),
											$elm$svg$Svg$Attributes$strokeLinejoin('round')
										]))
								]))
						]))
				]));
	}
};
var $elm$core$List$map3 = _List_map3;
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $elm$svg$Svg$polyline = $elm$svg$Svg$trustedNode('polyline');
var $author$project$PF6$Charts$Stack$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return A2($author$project$PF6$Charts$Internal$Skeleton$view, cfg.aB, cfg.as);
	} else {
		var xMin = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(cfg.bf));
		var padTop = (cfg.H !== '') ? 40 : 20;
		var padRight = 30;
		var padLeft = (cfg.bg !== '') ? 65 : 50;
		var padBottom = (cfg.be !== '') ? 75 : 50;
		var n = $elm$core$List$length(cfg.bf);
		var totals = A3(
			$elm$core$List$foldl,
			F2(
				function (series, acc) {
					return A3($elm$core$List$map2, $elm$core$Basics$add, acc, series.bR);
				}),
			A2($elm$core$List$repeat, n, 0),
			cfg.a4);
		var yMax = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$maximum(totals));
		var xMax = A2(
			$elm$core$Maybe$withDefault,
			n - 1,
			$elm$core$List$maximum(cfg.bf));
		var legendWidth = $elm$core$List$length(cfg.a4) * 110;
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var legendItems = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, series) {
					var xOff = idx * 110;
					var color = A2($author$project$PF6$Charts$Theme$seriesColor, idx, cfg.aO);
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$transform(
								'translate(' + ($elm$core$String$fromInt(xOff) + ',0)'))
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$rect,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x('0'),
										$elm$svg$Svg$Attributes$y('0'),
										$elm$svg$Svg$Attributes$width('12'),
										$elm$svg$Svg$Attributes$height('12'),
										$elm$svg$Svg$Attributes$fill(color),
										$elm$svg$Svg$Attributes$rx('2')
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x('16'),
										$elm$svg$Svg$Attributes$y('10'),
										$elm$svg$Svg$Attributes$fontSize('11'),
										$elm$svg$Svg$Attributes$fill(labelColor)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(series.o)
									]))
							]));
				}),
			cfg.a4);
		var innerW = (cfg.aB - padLeft) - padRight;
		var legendX = padLeft + A2($elm$core$Basics$max, 0, ((innerW / 2) | 0) - ((legendWidth / 2) | 0));
		var xScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(0, innerW),
			_Utils_Tuple2(xMin, xMax));
		var innerH = (cfg.as - padTop) - padBottom;
		var yScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(innerH, 0),
			_Utils_Tuple2(0, yMax * 1.1));
		var gridColor = $author$project$PF6$Charts$Theme$gridColor(cfg.aO);
		var gridLines = A2(
			$elm$core$List$map,
			function (tick) {
				var y = A2($author$project$Scale$convert, yScale, tick);
				return A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x1('0'),
							$elm$svg$Svg$Attributes$x2(
							$elm$core$String$fromInt(innerW)),
							$elm$svg$Svg$Attributes$y1(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$y2(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$stroke(gridColor),
							$elm$svg$Svg$Attributes$strokeWidth('1'),
							$elm$svg$Svg$Attributes$strokeDasharray('4,4')
						]),
					_List_Nil);
			},
			A2($author$project$Scale$ticks, yScale, 5));
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var baselines = A3(
			$elm$core$List$foldl,
			F2(
				function (series, _v5) {
					var accBaselines = _v5.a;
					var runningSum = _v5.b;
					var newBaseline = runningSum;
					return _Utils_Tuple2(
						_Utils_ap(
							accBaselines,
							_List_fromArray(
								[newBaseline])),
						A3($elm$core$List$map2, $elm$core$Basics$add, runningSum, series.bR));
				}),
			_Utils_Tuple2(
				_List_Nil,
				A2($elm$core$List$repeat, n, 0)),
			cfg.a4).a;
		var areas = A4(
			$elm$core$List$map3,
			F3(
				function (idx, series, baseline) {
					var points = A4(
						$elm$core$List$map3,
						F3(
							function (x, baseY, val) {
								var y1 = A2($author$project$Scale$convert, yScale, baseY + val);
								var y0 = A2($author$project$Scale$convert, yScale, baseY);
								var px = A2($author$project$Scale$convert, xScale, x);
								return _Utils_Tuple3(px, y0, y1);
							}),
						cfg.bf,
						baseline,
						series.bR);
					var topPoints = A2(
						$elm$core$List$map,
						function (_v4) {
							var px = _v4.a;
							var y1 = _v4.c;
							return _Utils_Tuple2(px, y1);
						},
						points);
					var color = A2($author$project$PF6$Charts$Theme$seriesColor, idx, cfg.aO);
					var fillColor = A2($author$project$PF6$Charts$Internal$Color$hexToRgba, color, 0.7);
					var bottomPoints = $elm$core$List$reverse(
						A2(
							$elm$core$List$map,
							function (_v3) {
								var px = _v3.a;
								var y0 = _v3.b;
								return _Utils_Tuple2(px, y0);
							},
							points));
					var allPoly = _Utils_ap(topPoints, bottomPoints);
					var polyStr = A2(
						$elm$core$String$join,
						' ',
						A2(
							$elm$core$List$map,
							function (_v2) {
								var px = _v2.a;
								var py = _v2.b;
								return $elm$core$String$fromFloat(px) + (',' + $elm$core$String$fromFloat(py));
							},
							allPoly));
					return A2(
						$elm$svg$Svg$g,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$polygon,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$points(polyStr),
										$elm$svg$Svg$Attributes$fill(fillColor),
										$elm$svg$Svg$Attributes$stroke('none')
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$polyline,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$points(
										A2(
											$elm$core$String$join,
											' ',
											A2(
												$elm$core$List$map,
												function (_v1) {
													var px = _v1.a;
													var py = _v1.b;
													return $elm$core$String$fromFloat(px) + (',' + $elm$core$String$fromFloat(py));
												},
												topPoints))),
										$elm$svg$Svg$Attributes$fill('none'),
										$elm$svg$Svg$Attributes$stroke(color),
										$elm$svg$Svg$Attributes$strokeWidth('1.5')
									]),
								_List_Nil)
							]));
				}),
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(cfg.a4) - 1),
			cfg.a4,
			baselines);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(cfg.aB)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(cfg.as)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(cfg.aB) + (' ' + $elm$core$String$fromInt(cfg.as)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + ('; font-size: 12px; fill: ' + (labelColor + ';'))))
						]),
					_List_fromArray(
						[
							(cfg.H !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt((cfg.aB / 2) | 0)),
									$elm$svg$Svg$Attributes$y('20'),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('14'),
									$elm$svg$Svg$Attributes$fontWeight('600'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.H)
								])) : $elm$svg$Svg$text(''),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(padLeft) + (',' + ($elm$core$String$fromInt(padTop) + ')'))))
								]),
							_Utils_ap(
								gridLines,
								_Utils_ap(
									areas,
									_List_fromArray(
										[
											A2(
											$elm$svg$Svg$g,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$transform(
													'translate(0,' + ($elm$core$String$fromInt(innerH) + ')'))
												]),
											_List_fromArray(
												[
													A2(
													$author$project$Axis$bottom,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(6)
														]),
													xScale)
												])),
											A2(
											$elm$svg$Svg$g,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$author$project$Axis$left,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(5)
														]),
													yScale)
												]))
										])))),
							(cfg.be !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt(padLeft + ((innerW / 2) | 0))),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromInt(cfg.as - 30)),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.be)
								])) : $elm$svg$Svg$text(''),
							(cfg.bg !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'rotate(-90) translate(-' + ($elm$core$String$fromInt(padTop + ((innerH / 2) | 0)) + ',14)')),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.bg)
								])) : $elm$svg$Svg$text(''),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(legendX) + (',' + ($elm$core$String$fromInt(cfg.as - 12) + ')'))))
								]),
							legendItems)
						]))
				]));
	}
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $author$project$PF6$Charts$Threshold$toSvg = function (_v0) {
	var cfg = _v0;
	if (cfg.b8) {
		return A2($author$project$PF6$Charts$Internal$Skeleton$view, cfg.aB, cfg.as);
	} else {
		var ys = A2($elm$core$List$map, $elm$core$Tuple$second, cfg.b0);
		var xs = A2($elm$core$List$map, $elm$core$Tuple$first, cfg.b0);
		var xMin = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(xs));
		var xMax = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$maximum(xs));
		var padTop = (cfg.H !== '') ? 40 : 20;
		var padRight = A2(
			$elm$core$List$any,
			function (t) {
				return t.o !== '';
			},
			cfg.aP) ? 80 : 30;
		var padLeft = (cfg.bg !== '') ? 65 : 50;
		var padBottom = (cfg.be !== '') ? 55 : 40;
		var labelColor = $author$project$PF6$Charts$Theme$labelColor(cfg.aO);
		var innerW = (cfg.aB - padLeft) - padRight;
		var xScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(0, innerW),
			_Utils_Tuple2(xMin, xMax));
		var innerH = (cfg.as - padTop) - padBottom;
		var gridColor = $author$project$PF6$Charts$Theme$gridColor(cfg.aO);
		var font = $author$project$PF6$Charts$Theme$fontFamily(cfg.aO);
		var fillColor = A2($author$project$PF6$Charts$Internal$Color$hexToRgba, cfg.aU, cfg.b3);
		var allYValues = _Utils_ap(
			ys,
			A2(
				$elm$core$List$map,
				function ($) {
					return $.az;
				},
				cfg.aP));
		var yMax = A2(
			$elm$core$Maybe$withDefault,
			100,
			$elm$core$List$maximum(allYValues));
		var yScale = A2(
			$author$project$Scale$linear,
			_Utils_Tuple2(innerH, 0),
			_Utils_Tuple2(0, yMax * 1.1));
		var gridLines = A2(
			$elm$core$List$map,
			function (tick) {
				var y = A2($author$project$Scale$convert, yScale, tick);
				return A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x1('0'),
							$elm$svg$Svg$Attributes$x2(
							$elm$core$String$fromInt(innerW)),
							$elm$svg$Svg$Attributes$y1(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$y2(
							$elm$core$String$fromFloat(y)),
							$elm$svg$Svg$Attributes$stroke(gridColor),
							$elm$svg$Svg$Attributes$strokeWidth('1'),
							$elm$svg$Svg$Attributes$strokeDasharray('4,4')
						]),
					_List_Nil);
			},
			A2($author$project$Scale$ticks, yScale, 5));
		var thresholdLines = A2(
			$elm$core$List$map,
			function (t) {
				var ty = A2($author$project$Scale$convert, yScale, t.az);
				return A2(
					$elm$svg$Svg$g,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$line,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x1('0'),
									$elm$svg$Svg$Attributes$x2(
									$elm$core$String$fromInt(innerW)),
									$elm$svg$Svg$Attributes$y1(
									$elm$core$String$fromFloat(ty)),
									$elm$svg$Svg$Attributes$y2(
									$elm$core$String$fromFloat(ty)),
									$elm$svg$Svg$Attributes$stroke(t.aU),
									$elm$svg$Svg$Attributes$strokeWidth('2'),
									$elm$svg$Svg$Attributes$strokeDasharray('6,3')
								]),
							_List_Nil),
							(t.o !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt(innerW + 4)),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromFloat(ty + 4)),
									$elm$svg$Svg$Attributes$fontSize('10'),
									$elm$svg$Svg$Attributes$fill(t.aU)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(t.o)
								])) : $elm$svg$Svg$text('')
						]));
			},
			cfg.aP);
		var toAreaPoint = function (_v2) {
			var x = _v2.a;
			var y = _v2.b;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(
					_Utils_Tuple2(
						A2($author$project$Scale$convert, xScale, x),
						A2($author$project$Scale$convert, yScale, 0)),
					_Utils_Tuple2(
						A2($author$project$Scale$convert, xScale, x),
						A2($author$project$Scale$convert, yScale, y))));
		};
		var areaPath = A2(
			$author$project$Shape$area,
			$author$project$Shape$monotoneInXCurve,
			A2($elm$core$List$map, toAreaPoint, cfg.b0));
		var toLinePoint = function (_v1) {
			var x = _v1.a;
			var y = _v1.b;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(
					A2($author$project$Scale$convert, xScale, x),
					A2($author$project$Scale$convert, yScale, y)));
		};
		var linePath = A2(
			$author$project$Shape$line,
			$author$project$Shape$monotoneInXCurve,
			A2($elm$core$List$map, toLinePoint, cfg.b0));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'font-family', font)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(cfg.aB)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(cfg.as)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(cfg.aB) + (' ' + $elm$core$String$fromInt(cfg.as)))),
							$elm$svg$Svg$Attributes$style('font-family: ' + (font + ('; font-size: 12px; fill: ' + (labelColor + ';'))))
						]),
					_List_fromArray(
						[
							(cfg.H !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt((cfg.aB / 2) | 0)),
									$elm$svg$Svg$Attributes$y('20'),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('14'),
									$elm$svg$Svg$Attributes$fontWeight('600'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.H)
								])) : $elm$svg$Svg$text(''),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromInt(padLeft) + (',' + ($elm$core$String$fromInt(padTop) + ')'))))
								]),
							_Utils_ap(
								gridLines,
								_Utils_ap(
									thresholdLines,
									_List_fromArray(
										[
											A2(
											$folkertdev$one_true_path_experiment$Path$element,
											areaPath,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$fill(fillColor),
													$elm$svg$Svg$Attributes$stroke('none')
												])),
											A2(
											$folkertdev$one_true_path_experiment$Path$element,
											linePath,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$fill('none'),
													$elm$svg$Svg$Attributes$stroke(cfg.aU),
													$elm$svg$Svg$Attributes$strokeWidth('2'),
													$elm$svg$Svg$Attributes$strokeLinejoin('round')
												])),
											A2(
											$elm$svg$Svg$g,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$transform(
													'translate(0,' + ($elm$core$String$fromInt(innerH) + ')'))
												]),
											_List_fromArray(
												[
													A2(
													$author$project$Axis$bottom,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(6)
														]),
													xScale)
												])),
											A2(
											$elm$svg$Svg$g,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$author$project$Axis$left,
													_List_fromArray(
														[
															$author$project$Axis$tickCount(5)
														]),
													yScale)
												]))
										])))),
							(cfg.be !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromInt(padLeft + ((innerW / 2) | 0))),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromInt(cfg.as - 8)),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.be)
								])) : $elm$svg$Svg$text(''),
							(cfg.bg !== '') ? A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'rotate(-90) translate(-' + ($elm$core$String$fromInt(padTop + ((innerH / 2) | 0)) + ',14)')),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('12'),
									$elm$svg$Svg$Attributes$fill(labelColor)
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(cfg.bg)
								])) : $elm$svg$Svg$text('')
						]))
				]));
	}
};
var $author$project$PF6$Charts$Donut$withCenterText = F3(
	function (value, label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bn: label, bo: value});
	});
var $author$project$PF6$Charts$Sparkline$withColor = F2(
	function (c, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{aU: c});
	});
var $author$project$PF6$Charts$Donut$withColors = F2(
	function (colors, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bX: colors});
	});
var $author$project$PF6$Charts$DonutUtilization$withDangerThreshold = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{b$: t});
	});
var $author$project$PF6$Charts$Sparkline$withFill = F2(
	function (f, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{b2: f});
	});
var $author$project$PF6$Charts$Sparkline$withHeight = F2(
	function (h, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{as: h});
	});
var $author$project$PF6$Charts$Donut$withSize = F2(
	function (s, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bF: s});
	});
var $author$project$PF6$Charts$Pie$withSize = F2(
	function (s, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bF: s});
	});
var $author$project$PF6$Charts$Threshold$withThresholdLabel = F4(
	function (value, color, label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{
				aP: _Utils_ap(
					cfg.aP,
					_List_fromArray(
						[
							{aU: color, o: label, az: value}
						]))
			});
	});
var $author$project$PF6$Charts$Area$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$Bar$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$BoxPlot$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$Bullet$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$Donut$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$DonutUtilization$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$Line$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$Pie$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$Scatter$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$Stack$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$Threshold$withTitle = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{H: t});
	});
var $author$project$PF6$Charts$Area$withTooltips = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{cp: t});
	});
var $author$project$PF6$Charts$Bar$withTooltips = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{cp: t});
	});
var $author$project$PF6$Charts$Donut$withTooltips = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{cp: t});
	});
var $author$project$PF6$Charts$Pie$withTooltips = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{cp: t});
	});
var $author$project$PF6$Charts$Scatter$withTooltips = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{cp: t});
	});
var $author$project$PF6$Charts$Bullet$withUnit = F2(
	function (u, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{cs: u});
	});
var $author$project$PF6$Charts$DonutUtilization$withWarningThreshold = F2(
	function (t, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{cu: t});
	});
var $author$project$PF6$Charts$Area$withWidth = F2(
	function (w, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{aB: w});
	});
var $author$project$PF6$Charts$Bar$withWidth = F2(
	function (w, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{aB: w});
	});
var $author$project$PF6$Charts$BoxPlot$withWidth = F2(
	function (w, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{aB: w});
	});
var $author$project$PF6$Charts$Bullet$withWidth = F2(
	function (w, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{aB: w});
	});
var $author$project$PF6$Charts$Line$withWidth = F2(
	function (w, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{aB: w});
	});
var $author$project$PF6$Charts$Scatter$withWidth = F2(
	function (w, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{aB: w});
	});
var $author$project$PF6$Charts$Sparkline$withWidth = F2(
	function (w, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{aB: w});
	});
var $author$project$PF6$Charts$Stack$withWidth = F2(
	function (w, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{aB: w});
	});
var $author$project$PF6$Charts$Threshold$withWidth = F2(
	function (w, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{aB: w});
	});
var $author$project$PF6$Charts$Area$withXLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{be: label});
	});
var $author$project$PF6$Charts$Line$withXLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{be: label});
	});
var $author$project$PF6$Charts$Scatter$withXLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{be: label});
	});
var $author$project$PF6$Charts$Stack$withXLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{be: label});
	});
var $author$project$PF6$Charts$Threshold$withXLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{be: label});
	});
var $author$project$PF6$Charts$Area$withYLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bg: label});
	});
var $author$project$PF6$Charts$Bar$withYLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bg: label});
	});
var $author$project$PF6$Charts$BoxPlot$withYLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bg: label});
	});
var $author$project$PF6$Charts$Line$withYLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bg: label});
	});
var $author$project$PF6$Charts$Scatter$withYLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bg: label});
	});
var $author$project$PF6$Charts$Stack$withYLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bg: label});
	});
var $author$project$PF6$Charts$Threshold$withYLabel = F2(
	function (label, _v0) {
		var cfg = _v0;
		return _Utils_update(
			cfg,
			{bg: label});
	});
var $author$project$Main$allChartPanels = function (model) {
	return _List_fromArray(
		[
			{
			A: $author$project$PF6$Charts$Area$toSvg(
				A2(
					$author$project$PF6$Charts$Area$withTooltips,
					true,
					A2(
						$author$project$PF6$Charts$Area$withTitle,
						'CPU Utilization',
						A2(
							$author$project$PF6$Charts$Area$withYLabel,
							'CPU %',
							A2(
								$author$project$PF6$Charts$Area$withXLabel,
								'Time (minutes)',
								A2(
									$author$project$PF6$Charts$Area$withWidth,
									560,
									$author$project$PF6$Charts$Area$fromData($author$project$Main$cpuData))))))),
			B: 'Area.fromData cpuData\n    |> Area.withWidth 560\n    |> Area.withXLabel "Time (minutes)"\n    |> Area.withYLabel "CPU %"\n    |> Area.withTitle "CPU Utilization"\n    |> Area.withTooltips True\n    |> Area.toSvg',
			C: 'Area charts show a metric over time with a filled region under the line. Best for continuous data like CPU utilization, memory usage, or bandwidth. Hover the data points to see tooltips.',
			cJ: 'area',
			H: 'Area Chart'
		},
			{
			A: $author$project$PF6$Charts$Bar$toSvg(
				A2(
					$author$project$PF6$Charts$Bar$withTooltips,
					true,
					A2(
						$author$project$PF6$Charts$Bar$withTitle,
						'Memory Usage by Node',
						A2(
							$author$project$PF6$Charts$Bar$withYLabel,
							'GiB',
							A2(
								$author$project$PF6$Charts$Bar$withWidth,
								560,
								A2($author$project$PF6$Charts$Bar$fromData, $author$project$Main$memoryCategories, $author$project$Main$memoryData)))))),
			B: 'Bar.fromData\n    [ "Node 1", "Node 2", "Node 3", "Node 4", "Node 5" ]\n    [ { label = "Used (GiB)", values = [ 12.4, 18.7, 8.2, 15.1, 22.0 ] }\n    , { label = "Cached (GiB)", values = [ 4.2, 6.1, 3.5, 5.8, 7.3 ] }\n    ]\n    |> Bar.withWidth 560\n    |> Bar.withYLabel "GiB"\n    |> Bar.withTitle "Memory Usage by Node"\n    |> Bar.withTooltips True\n    |> Bar.toSvg',
			C: 'Bar charts compare values across categories. Grouped bars let you compare multiple series side-by-side per category. Hover bars for value tooltips.',
			cJ: 'bar',
			H: 'Bar Chart'
		},
			{
			A: $author$project$PF6$Charts$BoxPlot$toSvg(
				A2(
					$author$project$PF6$Charts$BoxPlot$withTitle,
					'API Response Latency by Month',
					A2(
						$author$project$PF6$Charts$BoxPlot$withYLabel,
						'Latency (ms)',
						A2(
							$author$project$PF6$Charts$BoxPlot$withWidth,
							560,
							$author$project$PF6$Charts$BoxPlot$fromData($author$project$Main$boxData))))),
			B: 'BoxPlot.fromData\n    [ { label = "Jan", min = 12, q1 = 28, median = 42, q3 = 58, max = 78 }\n    , { label = "Feb", min = 18, q1 = 32, median = 47, q3 = 63, max = 82 }\n    ]\n    |> BoxPlot.withWidth 560\n    |> BoxPlot.withYLabel "Latency (ms)"\n    |> BoxPlot.withTitle "API Response Latency by Month"\n    |> BoxPlot.toSvg',
			C: 'Box plots show the statistical distribution of data: median, interquartile range, and whiskers for min/max. Useful for comparing distributions across categories.',
			cJ: 'boxplot',
			H: 'Box Plot'
		},
			{
			A: A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'margin-bottom', '16px')
							]),
						_List_fromArray(
							[
								$author$project$PF6$Charts$Bullet$toSvg(
								A2(
									$author$project$PF6$Charts$Bullet$withUnit,
									'%',
									A2(
										$author$project$PF6$Charts$Bullet$withTitle,
										'CPU',
										A2(
											$author$project$PF6$Charts$Bullet$withWidth,
											560,
											A3($author$project$PF6$Charts$Bullet$fromData, 62, 75, 100)))))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'margin-bottom', '16px')
							]),
						_List_fromArray(
							[
								$author$project$PF6$Charts$Bullet$toSvg(
								A2(
									$author$project$PF6$Charts$Bullet$withUnit,
									' GiB',
									A2(
										$author$project$PF6$Charts$Bullet$withTitle,
										'Memory',
										A2(
											$author$project$PF6$Charts$Bullet$withWidth,
											560,
											A3($author$project$PF6$Charts$Bullet$fromData, 80, 90, 128)))))
							])),
						$author$project$PF6$Charts$Bullet$toSvg(
						A2(
							$author$project$PF6$Charts$Bullet$withUnit,
							'%',
							A2(
								$author$project$PF6$Charts$Bullet$withTitle,
								'Disk',
								A2(
									$author$project$PF6$Charts$Bullet$withWidth,
									560,
									A3($author$project$PF6$Charts$Bullet$fromData, 45, 60, 100)))))
					])),
			B: 'Bullet.fromData 62 75 100\n    |> Bullet.withWidth 560\n    |> Bullet.withTitle "CPU"\n    |> Bullet.withUnit "%"\n    |> Bullet.toSvg',
			C: 'Bullet charts show a primary measure against a qualitative range (poor / needs improvement / good) and a target marker. A compact alternative to gauge charts.',
			cJ: 'bullet',
			H: 'Bullet Chart'
		},
			{
			A: A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'gap', '48px'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					]),
				_List_fromArray(
					[
						$author$project$PF6$Charts$Donut$toSvg(
						A2(
							$author$project$PF6$Charts$Donut$withTooltips,
							true,
							A2(
								$author$project$PF6$Charts$Donut$withTitle,
								'Instance Status',
								A3(
									$author$project$PF6$Charts$Donut$withCenterText,
									'58',
									'Instances',
									$author$project$PF6$Charts$Donut$fromData($author$project$Main$donutSlices))))),
						$author$project$PF6$Charts$Donut$toSvg(
						A2(
							$author$project$PF6$Charts$Donut$withTooltips,
							true,
							A2(
								$author$project$PF6$Charts$Donut$withTitle,
								'Smaller variant',
								A3(
									$author$project$PF6$Charts$Donut$withCenterText,
									'58',
									'Instances',
									A2(
										$author$project$PF6$Charts$Donut$withColors,
										$author$project$PF6$Charts$Colors$multiOrdered,
										A2(
											$author$project$PF6$Charts$Donut$withSize,
											200,
											$author$project$PF6$Charts$Donut$fromData($author$project$Main$donutSlices)))))))
					])),
			B: 'Donut.fromData\n    [ { label = "Running", value = 42 }\n    , { label = "Stopped", value = 8 }\n    , { label = "Pending", value = 5 }\n    , { label = "Failed", value = 3 }\n    ]\n    |> Donut.withCenterText "58" "Instances"\n    |> Donut.withTitle "Instance Status"\n    |> Donut.withTooltips True\n    |> Donut.toSvg',
			C: 'Donut charts show part-to-whole relationships with a hollow center that can display a summary metric. A core PatternFly pattern for resource allocation and status breakdowns. Hover slices for label + percentage tooltips.',
			cJ: 'donut',
			H: 'Donut Chart'
		},
			{
			A: A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'gap', '48px'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					]),
				_List_fromArray(
					[
						$author$project$PF6$Charts$DonutUtilization$toSvg(
						A2(
							$author$project$PF6$Charts$DonutUtilization$withTitle,
							'vCPU Quota',
							A2($author$project$PF6$Charts$DonutUtilization$fromData, 48, 100))),
						$author$project$PF6$Charts$DonutUtilization$toSvg(
						A2(
							$author$project$PF6$Charts$DonutUtilization$withWarningThreshold,
							75,
							A2(
								$author$project$PF6$Charts$DonutUtilization$withTitle,
								'Memory Quota',
								A2($author$project$PF6$Charts$DonutUtilization$fromData, 78, 100)))),
						$author$project$PF6$Charts$DonutUtilization$toSvg(
						A2(
							$author$project$PF6$Charts$DonutUtilization$withDangerThreshold,
							90,
							A2(
								$author$project$PF6$Charts$DonutUtilization$withTitle,
								'Storage Quota',
								A2($author$project$PF6$Charts$DonutUtilization$fromData, 92, 100))))
					])),
			B: '-- Normal (48%)\nDonutUtil.fromData 48 100\n    |> DonutUtil.withTitle "vCPU Quota"\n    |> DonutUtil.toSvg\n\n-- Warning (78%, threshold at 75%)\nDonutUtil.fromData 78 100\n    |> DonutUtil.withTitle "Memory Quota"\n    |> DonutUtil.withWarningThreshold 75\n    |> DonutUtil.toSvg',
			C: 'Donut utilization charts show a single metric\'s utilization against its total. The arc color shifts to warning (gold) or danger (red) as configurable thresholds are crossed.',
			cJ: 'donut-util',
			H: 'Donut Utilization'
		},
			{
			A: $author$project$PF6$Charts$Line$toSvg(
				A2(
					$author$project$PF6$Charts$Line$withTitle,
					'Network Throughput',
					A2(
						$author$project$PF6$Charts$Line$withYLabel,
						'Mbps',
						A2(
							$author$project$PF6$Charts$Line$withXLabel,
							'Time (minutes)',
							A2(
								$author$project$PF6$Charts$Line$withWidth,
								560,
								$author$project$PF6$Charts$Line$fromSeries($author$project$Main$networkSeriesData)))))),
			B: 'Line.fromSeries\n    [ { label = "Inbound",  data = inboundData }\n    , { label = "Outbound", data = outboundData }\n    ]\n    |> Line.withWidth 560\n    |> Line.withXLabel "Time (minutes)"\n    |> Line.withYLabel "Mbps"\n    |> Line.withTitle "Network Throughput"\n    |> Line.toSvg',
			C: 'Line charts show one or more continuous metrics over time. Multiple series use the multi-unordered color scale and are automatically labeled in a legend.',
			cJ: 'line',
			H: 'Line Chart'
		},
			{
			A: $author$project$PF6$Charts$Pie$toSvg(
				A2(
					$author$project$PF6$Charts$Pie$withTooltips,
					true,
					A2(
						$author$project$PF6$Charts$Pie$withTitle,
						'Instances by Region',
						A2(
							$author$project$PF6$Charts$Pie$withSize,
							250,
							$author$project$PF6$Charts$Pie$fromData($author$project$Main$pieSlices))))),
			B: 'Pie.fromData\n    [ { label = "US East", value = 35 }\n    , { label = "US West", value = 28 }\n    , { label = "EU",      value = 22 }\n    , { label = "APAC",    value = 15 }\n    ]\n    |> Pie.withSize 250\n    |> Pie.withTitle "Instances by Region"\n    |> Pie.withTooltips True\n    |> Pie.toSvg',
			C: 'Pie charts show part-to-whole relationships as solid circular slices. Use Donut when you need a center metric label. Hover slices for label + percentage tooltips.',
			cJ: 'pie',
			H: 'Pie Chart'
		},
			{
			A: $author$project$PF6$Charts$Scatter$toSvg(
				A2(
					$author$project$PF6$Charts$Scatter$withTooltips,
					true,
					A2(
						$author$project$PF6$Charts$Scatter$withTitle,
						'Cluster Resource Distribution',
						A2(
							$author$project$PF6$Charts$Scatter$withYLabel,
							'Memory (GiB)',
							A2(
								$author$project$PF6$Charts$Scatter$withXLabel,
								'CPU Cores',
								A2(
									$author$project$PF6$Charts$Scatter$withWidth,
									560,
									$author$project$PF6$Charts$Scatter$fromSeries($author$project$Main$scatterSeriesData))))))),
			B: 'Scatter.fromSeries\n    [ { label = "Cluster A", data = clusterAPoints }\n    , { label = "Cluster B", data = clusterBPoints }\n    ]\n    |> Scatter.withWidth 560\n    |> Scatter.withXLabel "CPU Cores"\n    |> Scatter.withYLabel "Memory (GiB)"\n    |> Scatter.withTitle "Cluster Resource Distribution"\n    |> Scatter.withTooltips True\n    |> Scatter.toSvg',
			C: 'Scatter charts plot individual data points on a 2D plane to reveal correlations or clusters. Multiple series use distinct colors. Hover points for (x, y) tooltips.',
			cJ: 'scatter',
			H: 'Scatter Chart'
		},
			{
			A: A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2($elm$html$Html$Attributes$style, 'gap', '16px'),
						A2($elm$html$Html$Attributes$style, 'width', '100%')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
								A2($elm$html$Html$Attributes$style, 'gap', '16px'),
								A2($elm$html$Html$Attributes$style, 'background', '#f0f0f0'),
								A2($elm$html$Html$Attributes$style, 'padding', '12px 16px'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '6px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'width', '120px'),
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'color', '#151515')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('CPU')
									])),
								$author$project$PF6$Charts$Sparkline$toSvg(
								A2(
									$author$project$PF6$Charts$Sparkline$withHeight,
									40,
									A2(
										$author$project$PF6$Charts$Sparkline$withWidth,
										180,
										$author$project$PF6$Charts$Sparkline$fromData($author$project$Main$sparklineValues)))),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'color', '#6a6e73')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('75%')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
								A2($elm$html$Html$Attributes$style, 'gap', '16px'),
								A2($elm$html$Html$Attributes$style, 'background', '#f0f0f0'),
								A2($elm$html$Html$Attributes$style, 'padding', '12px 16px'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '6px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'width', '120px'),
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'color', '#151515')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Memory')
									])),
								$author$project$PF6$Charts$Sparkline$toSvg(
								A2(
									$author$project$PF6$Charts$Sparkline$withColor,
									$author$project$PF6$Charts$Colors$green300,
									A2(
										$author$project$PF6$Charts$Sparkline$withHeight,
										40,
										A2(
											$author$project$PF6$Charts$Sparkline$withWidth,
											180,
											$author$project$PF6$Charts$Sparkline$fromData(
												_List_fromArray(
													[60, 62, 65, 68, 72, 70, 75, 80, 78, 82, 85, 88])))))),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'color', '#6a6e73')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('88%')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
								A2($elm$html$Html$Attributes$style, 'gap', '16px'),
								A2($elm$html$Html$Attributes$style, 'background', '#f0f0f0'),
								A2($elm$html$Html$Attributes$style, 'padding', '12px 16px'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '6px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'width', '120px'),
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'color', '#151515')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Disk I/O')
									])),
								$author$project$PF6$Charts$Sparkline$toSvg(
								A2(
									$author$project$PF6$Charts$Sparkline$withFill,
									false,
									A2(
										$author$project$PF6$Charts$Sparkline$withColor,
										$author$project$PF6$Charts$Colors$teal300,
										A2(
											$author$project$PF6$Charts$Sparkline$withHeight,
											40,
											A2(
												$author$project$PF6$Charts$Sparkline$withWidth,
												180,
												$author$project$PF6$Charts$Sparkline$fromData(
													_List_fromArray(
														[20, 25, 22, 28, 30, 35, 28, 32, 38, 35, 40, 42]))))))),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'color', '#6a6e73')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('42 MB/s')
									]))
							]))
					])),
			B: '-- Embed in a table/card row:\nHtml.div [ HA.style "display" "flex", HA.style "align-items" "center" ]\n    [ Html.span [] [ Html.text "CPU" ]\n    , Sparkline.fromData [ 42, 55, 48, 72, 63, 75 ]\n        |> Sparkline.withWidth 180\n        |> Sparkline.withHeight 40\n        |> Sparkline.toSvg\n    , Html.span [] [ Html.text "75%" ]\n    ]',
			C: 'Sparklines are miniature, axis-free line charts for embedding in tables, cards, or list items to show a metric\'s trend without the overhead of a full chart.',
			cJ: 'sparkline',
			H: 'Sparkline'
		},
			{
			A: $author$project$PF6$Charts$Stack$toSvg(
				A2(
					$author$project$PF6$Charts$Stack$withTitle,
					'Bandwidth by Project',
					A2(
						$author$project$PF6$Charts$Stack$withYLabel,
						'Bandwidth (GB)',
						A2(
							$author$project$PF6$Charts$Stack$withXLabel,
							'Week',
							A2(
								$author$project$PF6$Charts$Stack$withWidth,
								560,
								$author$project$PF6$Charts$Stack$fromSeries($author$project$Main$stackSeriesData)))))),
			B: 'Stack.fromSeries\n    [ { label = "Project A", values = [ 10, 14, 18, 22, 20, 25, 28, 24 ] }\n    , { label = "Project B", values = [ 8, 10, 12, 15, 13, 16, 18, 15 ] }\n    , { label = "Project C", values = [ 5, 7, 9, 11, 10, 12, 14, 12 ] }\n    ]\n    |> Stack.withWidth 560\n    |> Stack.withXLabel "Week"\n    |> Stack.withYLabel "Bandwidth (GB)"\n    |> Stack.withTitle "Bandwidth by Project"\n    |> Stack.toSvg',
			C: 'Stacked area charts show multiple series stacked atop each other, making it easy to see both individual series contributions and the total over time.',
			cJ: 'stack',
			H: 'Stack Chart'
		},
			{
			A: $author$project$PF6$Charts$Threshold$toSvg(
				A4(
					$author$project$PF6$Charts$Threshold$withThresholdLabel,
					90,
					'#c9190b',
					'Critical (90%)',
					A4(
						$author$project$PF6$Charts$Threshold$withThresholdLabel,
						75,
						'#f0ab00',
						'Warning (75%)',
						A2(
							$author$project$PF6$Charts$Threshold$withTitle,
							'CPU with Warning Thresholds',
							A2(
								$author$project$PF6$Charts$Threshold$withYLabel,
								'CPU %',
								A2(
									$author$project$PF6$Charts$Threshold$withXLabel,
									'Time (minutes)',
									A2(
										$author$project$PF6$Charts$Threshold$withWidth,
										560,
										$author$project$PF6$Charts$Threshold$fromData($author$project$Main$thresholdData)))))))),
			B: 'Threshold.fromData cpuData\n    |> Threshold.withWidth 560\n    |> Threshold.withXLabel "Time (minutes)"\n    |> Threshold.withYLabel "CPU %"\n    |> Threshold.withTitle "CPU with Warning Thresholds"\n    |> Threshold.withThresholdLabel 75 "#f0ab00" "Warning (75%)"\n    |> Threshold.withThresholdLabel 90 "#c9190b" "Critical (90%)"\n    |> Threshold.toSvg',
			C: 'Threshold charts add horizontal warning/danger lines to a line chart. Essential for infrastructure dashboards showing SLA boundaries or capacity limits.',
			cJ: 'threshold',
			H: 'Threshold Chart'
		},
			{
			A: $author$project$PF6$Charts$Area$toSvg(
				A2(
					$author$project$PF6$Charts$Area$withTooltips,
					true,
					A2(
						$author$project$PF6$Charts$Area$withTitle,
						'Responsive Area Chart (' + ($elm$core$String$fromInt(model.bD) + 'px)'),
						A2(
							$author$project$PF6$Charts$Area$withYLabel,
							'CPU %',
							A2(
								$author$project$PF6$Charts$Area$withXLabel,
								'Time (minutes)',
								A2(
									$author$project$PF6$Charts$Area$withWidth,
									model.bD,
									$author$project$PF6$Charts$Area$fromData($author$project$Main$cpuData))))))),
			B: '-- ─── Elm side (your app, not the library) ────────────────────────────────\n\n-- 1. Change your module declaration:\nport module Main exposing (main)\n\n-- 2. Declare the port (one line):\nport containerWidth : (Int -> msg) -> Sub msg\n\n-- 3. Add a field to your Model:\ntype alias Model =\n    { ..., chartWidth : Int }\n\n-- 4. Add a Msg variant:\ntype Msg = ... | ResizedTo Int\n\n-- 5. Handle it in update:\nResizedTo w ->\n    ( { model | chartWidth = max 200 (w - 48) }, Cmd.none )\n\n-- 6. Subscribe:\nsubscriptions : Model -> Sub Msg\nsubscriptions _ =\n    containerWidth ResizedTo\n\n-- 7. Pass the width to any chart:\nArea.fromData cpuData\n    |> Area.withWidth model.chartWidth\n    |> Area.toSvg\n\n\n-- ─── JS side (index.html, after Elm.Main.init) ───────────────────────────\n\n-- This entire block is optional — charts just use their last-set width\n-- if ResizeObserver is unavailable.\nif (typeof ResizeObserver !== \'undefined\') {\n  const ro = new ResizeObserver(entries => {\n    for (const entry of entries) {\n      app.ports.containerWidth.send(\n        Math.round(entry.contentRect.width)\n      );\n    }\n  });\n  // Observe whichever element wraps your chart area:\n  requestAnimationFrame(() => {\n    const el = document.querySelector(\'main\');\n    if (el) ro.observe(el);\n  });\n}',
			C: 'PF6.Charts is a package and cannot contain ports, but all chart types accept withWidth and withHeight. Wire up a ResizeObserver port in your own app to make any chart responsive — the library just consumes the width you pass. Resize your browser window to see the chart below reflow. The ResizeObserver is optional: charts fall back to their last known width if the JS API is unavailable.',
			cJ: 'resize',
			H: 'Resize Observer'
		}
		]);
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$main_ = _VirtualDom_node('main');
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $author$project$Main$navItems = _List_fromArray(
	[
		_Utils_Tuple2('area', 'Area Chart'),
		_Utils_Tuple2('bar', 'Bar Chart'),
		_Utils_Tuple2('boxplot', 'Box Plot'),
		_Utils_Tuple2('bullet', 'Bullet Chart'),
		_Utils_Tuple2('donut', 'Donut Chart'),
		_Utils_Tuple2('donut-util', 'Donut Utilization'),
		_Utils_Tuple2('line', 'Line Chart'),
		_Utils_Tuple2('pie', 'Pie Chart'),
		_Utils_Tuple2('scatter', 'Scatter Chart'),
		_Utils_Tuple2('sparkline', 'Sparkline'),
		_Utils_Tuple2('stack', 'Stack Chart'),
		_Utils_Tuple2('threshold', 'Threshold Chart'),
		_Utils_Tuple2('resize', 'Resize Observer')
	]);
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm$html$Html$code = _VirtualDom_node('code');
var $elm$html$Html$details = _VirtualDom_node('details');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $elm$html$Html$section = _VirtualDom_node('section');
var $elm$html$Html$summary = _VirtualDom_node('summary');
var $author$project$Main$viewChartPanel = function (panel) {
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id(panel.cJ),
				A2($elm$html$Html$Attributes$style, 'margin-bottom', '56px'),
				A2($elm$html$Html$Attributes$style, 'scroll-margin-top', '24px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
						A2($elm$html$Html$Attributes$style, 'font-weight', '700'),
						A2($elm$html$Html$Attributes$style, 'color', '#151515'),
						A2($elm$html$Html$Attributes$style, 'margin', '0 0 8px 0')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(panel.H)
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'color', '#6a6e73'),
						A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
						A2($elm$html$Html$Attributes$style, 'margin', '0 0 20px 0')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(panel.C)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background', '#ffffff'),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid #d2d2d2'),
						A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
						A2($elm$html$Html$Attributes$style, 'padding', '32px 24px'),
						A2($elm$html$Html$Attributes$style, 'margin-bottom', '16px'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'center')
					]),
				_List_fromArray(
					[panel.A])),
				A2(
				$elm$html$Html$details,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background', '#f8f8f8'),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid #d2d2d2'),
						A2($elm$html$Html$Attributes$style, 'border-radius', '6px'),
						A2($elm$html$Html$Attributes$style, 'padding', '0')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$summary,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'padding', '10px 16px'),
								A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
								A2($elm$html$Html$Attributes$style, 'font-size', '13px'),
								A2($elm$html$Html$Attributes$style, 'color', '#0066cc'),
								A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
								A2($elm$html$Html$Attributes$style, 'user-select', 'none')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Show Elm code')
							])),
						A2(
						$elm$html$Html$pre,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'margin', '0'),
								A2($elm$html$Html$Attributes$style, 'padding', '16px'),
								A2($elm$html$Html$Attributes$style, 'font-size', '13px'),
								A2($elm$html$Html$Attributes$style, 'line-height', '1.6'),
								A2($elm$html$Html$Attributes$style, 'overflow-x', 'auto'),
								A2($elm$html$Html$Attributes$style, 'background', '#212427'),
								A2($elm$html$Html$Attributes$style, 'color', '#e0e0e0'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '0 0 6px 6px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$code,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(panel.B)
									]))
							]))
					]))
			]));
};
var $author$project$Main$SetSection = function (a) {
	return {$: 0, a: a};
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Main$viewNavItem = F2(
	function (active, _v0) {
		var id = _v0.a;
		var label = _v0.b;
		var isActive = _Utils_eq(active, id);
		var color = isActive ? '#ffffff' : '#e0e0e0';
		var bg = isActive ? '#0066cc' : 'transparent';
		return A2(
			$elm$html$Html$li,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('#' + id),
							$elm$html$Html$Events$onClick(
							$author$project$Main$SetSection(id)),
							A2($elm$html$Html$Attributes$style, 'display', 'block'),
							A2($elm$html$Html$Attributes$style, 'padding', '8px 12px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
							A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
							A2($elm$html$Html$Attributes$style, 'color', color),
							A2($elm$html$Html$Attributes$style, 'background', bg),
							A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
							A2($elm$html$Html$Attributes$style, 'margin-bottom', '2px'),
							A2($elm$html$Html$Attributes$style, 'transition', 'background 0.1s')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]))
				]));
	});
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('pf-gallery'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'min-height', '100vh'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'Red Hat Text, RedHatText, sans-serif'),
				A2($elm$html$Html$Attributes$style, 'background', '#f0f0f0')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$nav,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'width', '220px'),
						A2($elm$html$Html$Attributes$style, 'min-width', '220px'),
						A2($elm$html$Html$Attributes$style, 'background', '#212427'),
						A2($elm$html$Html$Attributes$style, 'padding', '24px 0'),
						A2($elm$html$Html$Attributes$style, 'position', 'sticky'),
						A2($elm$html$Html$Attributes$style, 'top', '0'),
						A2($elm$html$Html$Attributes$style, 'height', '100vh'),
						A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'padding', '0 16px 20px 16px'),
								A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid #3c3f42'),
								A2($elm$html$Html$Attributes$style, 'margin-bottom', '12px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#'),
										A2($elm$html$Html$Attributes$style, 'text-decoration', 'none')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'color', '#73bcf7'),
												A2($elm$html$Html$Attributes$style, 'font-size', '18px'),
												A2($elm$html$Html$Attributes$style, 'font-weight', '700'),
												A2($elm$html$Html$Attributes$style, 'display', 'block')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('PF6.Charts')
											])),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'color', '#8a8d90'),
												A2($elm$html$Html$Attributes$style, 'font-size', '12px')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('PatternFly v6 for Elm')
											]))
									]))
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'list-style', 'none'),
								A2($elm$html$Html$Attributes$style, 'margin', '0'),
								A2($elm$html$Html$Attributes$style, 'padding', '0 8px')
							]),
						A2(
							$elm$core$List$map,
							$author$project$Main$viewNavItem(model.bS),
							$author$project$Main$navItems))
					])),
				A2(
				$elm$html$Html$main_,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'flex', '1'),
						A2($elm$html$Html$Attributes$style, 'padding', '32px 40px'),
						A2($elm$html$Html$Attributes$style, 'max-width', '1000px')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h1,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								A2($elm$html$Html$Attributes$style, 'font-weight', '700'),
								A2($elm$html$Html$Attributes$style, 'color', '#151515'),
								A2($elm$html$Html$Attributes$style, 'margin', '0 0 8px 0')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Charts')
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'color', '#6a6e73'),
								A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
								A2($elm$html$Html$Attributes$style, 'margin', '0 0 40px 0'),
								A2($elm$html$Html$Attributes$style, 'max-width', '640px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('PatternFly v6 chart components for Elm, built on\n                    gampleman/elm-visualization. All charts support light and\n                    dark themes, PF6 color tokens, and the builder pattern.')
							])),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						A2(
							$elm$core$List$map,
							$author$project$Main$viewChartPanel,
							$author$project$Main$allChartPanels(model)))
					]))
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		fi: function (_v0) {
			return _Utils_Tuple2($author$project$Main$initialModel, $elm$core$Platform$Cmd$none);
		},
		fR: $author$project$Main$subscriptions,
		fZ: $author$project$Main$update,
		f0: $author$project$Main$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));