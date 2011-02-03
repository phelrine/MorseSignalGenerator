morse = function(){
    var dot = '0';
    var bar = '1';
    var charDem = '2';
    var wordDem = '3';
    var dotTime = 160;
    var barTime = dotTime * 3;
    var cDemTime = dotTime * 3;
    var wDemTime = dotTime * 7;
    var morseTable = {
	A:'01', B:'1000', C:'1010', D:'100', E:'0', F:'0010',
	G:'110', H:'0000', I:'00', J:'0111', K:'101', L:'0100',
	M:'11', N:'10', O:'111', P:'0110', Q:'1101', R:'010', 
	S:'000', T:'1', U:'001', V:'0001', W:'011', X:'1001',
	Y:'1011', Z:'1100', ' ':wordDem
    };

    var toSignal = function(str){
	var toMorse = function(str){
	    var upperStr = str.toUpperCase();
	    var seq = '';
	    for(var i = 0; i < str.length; i++){
		var c = morseTable[upperStr[i]];
		if(c !== undefined){
		    seq += c;
		    seq += charDem;
		}else{
		    seq += wordDem;
		}
	    }
	    return seq;
	}
				 
	var bgWhite = function(seq, i){
	    if(i >= seq.length){
		$('embed').remove();
		return;
	    }
	    var c = seq[i];
	    if(c === charDem || c === wordDem){
		$('embed').remove();
		bgBlack(seq, i);
		return;
	    }
	    
	    $('body').append(
		$('<embed>').attr({
		    src: (c == dot)? 'dot.mp3' : 'bar.mp3',
		    autoplay: 'true',
		    hidden: 'true'
		})
	    );

	    $('body').css('background','white');
	    var interval = (c === dot)? dotTime : barTime;
	    setTimeout(
		function(){
		    bgBlack(seq, i);
		},
		interval
	    );
	}

	var bgBlack = function(seq, i){
	    var c = seq[i];
	    var interval = 
		(c === charDem)? cDemTime :
		(c === wordDem)? wDemTime :
		dotTime;
	    $('body').css('background','black');
	    setTimeout(
		function(){
		    bgWhite(seq, i + 1);
		},
		interval
	    );
	}
	
	bgWhite(toMorse(str), 0);
    }

    return {
	toSignal:toSignal
    };
}
