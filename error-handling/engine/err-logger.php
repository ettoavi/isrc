<?php ini_set('error_reporting', E_ALL);ini_set('display_errors', true );define('CRLF',"\n");class customScreen {	static public $buffer='';		static public function show() {		echo self::$buffer;		self::$buffer ='';	}}class errTemplate {   static public $instance;   static public $css;   static public $cssLoaded = false;   static public function getCss() {	    if ( is_null( self::$instance ) ) {            self::$instance = new self;            self::$css = file_get_contents(dirname(__FILE__).'/error-log.css');       }	   return CRLF.self::$css.CRLF;   }      static public function LoadCss() {	   if (!self::$cssLoaded) {		   self::$cssLoaded = true;		   customScreen::$buffer .= self::getCss();	   }   }}class CustomExceptions {	private static $instance;	private static $OriginErrHandler;	private static $UtilUrlLink = '/util';		static public function register() {		if( is_null( self::$OriginErrHandler ) ) {				self::$OriginErrHandler = set_error_handler(array(self::get(),'ErrorHandler'));			set_exception_handler(array(self::get(),'exceptionHandler'));			register_shutdown_function( array(self::get(),'CustomShutdown'));          self::$instance->init();		}		return self::$instance;	}		static public function get()     {        if( is_null( self::$instance ) ) {            self::$instance = new self;        }        return self::$instance;    }	public function init()     {		$request= explode('?',$_SERVER['REQUEST_URI']);		if (isset($request[1])) {			$request = $request[1];			$cmd = explode('=',$request);			switch ( $cmd[0] ) {				case 'forceopensrc':				//echo 'execute '.errTemplate::getCss().'</br>';				//exec("sh gedit");				break;			}			echo 'request passed is '.$cmd[0].'</br>';		}       return self::$instance;    }	public function fileToUrl($file,$fhtml) {		$out = '<a href="'.$fhtml.'?forceopensrc='.$file.'">'.basename($file).'</a>';		return $out;	}	public function phpInfoLink() {		return sprintf('<tr><td colspan=4>&nbsp; %s </td></tr>'.CRLF,'<a href="'.self::$UtilUrlLink.'/info.php">View PHP info setting</a>');	}		public function TraceBack($e, $seen=null,$prev=false,$count = 0) {		$firstcall = $count === 0;		$starter = $seen ? 'Caused by: ' : '';		$result = array();		if (!$seen) $seen = array();		$trace  = $e->getTrace();		if ($prev === false ) $prev = $e->getPrevious();		$Xception = sprintf('%s%s: %s', $starter, get_class($e), $e->getMessage());		$file = $e->getFile();		$line = $e->getLine();		$findex = count($trace) - 1;		$fhtml = basename(array_key_exists('file', $trace[$findex]) ? $trace[$findex]['file'] : 'err');		if ($count==0) {						$file = array_key_exists('file', $trace[0]) ? $trace[0]['file'] : 'Unknown Source';			$line = array_key_exists('file', $trace[0]) && array_key_exists('line', $trace[0]) && $trace[0]['line'] ? $trace[0]['line'] : null;			array_shift($trace);		}		while (true) {			$current = "$file:$line";			if (is_array($seen) && in_array($current, $seen)) {				$result[] = sprintf(' ... %d more', count($trace)+1);				break;			}			$result[] = sprintf('<tr><td class="monofont e">&nbsp;%s</td><td class="monofont e">&nbsp;%s%s%s</td><td class="monofont v">&nbsp;File : %s </td>'                            .'<td class="monofont v">&nbsp;%s%s</td></tr>'.CRLF, ++$count,                                    count($trace) && array_key_exists('class', $trace[0]) ? str_replace('\\', '.', $trace[0]['class']) : '',                                    count($trace) && array_key_exists('class', $trace[0]) && array_key_exists('function', $trace[0]) ? '.' : '',                                    count($trace) && array_key_exists('function', $trace[0]) ? str_replace('\\', '.', $trace[0]['function']) : '(main)',                                    $line === null ? $file : self::$instance->fileToUrl($file,$fhtml),                                    $line === null ? '' : 'Line : ',                                    $line === null ? '' : $line);			if (is_array($seen))				$seen[] = "$file:$line";			if (!count($trace))				break;			if (!array_key_exists('file', $trace[0])) break; 			$file = array_key_exists('file', $trace[0]) ? $trace[0]['file'] : 'Unknown Source';			$line = array_key_exists('file', $trace[0]) && array_key_exists('line', $trace[0]) && $trace[0]['line'] ? $trace[0]['line'] : null;			array_shift($trace);		}		$result = join("\n", $result);		if ($prev) $result  .= "\n" . self::$instance->TraceBack($prev,$seen, false,$count);				return ($firstcall?sprintf('<tr><td class="monofont h" colspan=4>&nbsp;%s</td></tr>'.CRLF,$Xception,'',''):'').$result;	}		public function ErrorHandler($errno, $errMessage,$error_file,$error_line) {		$type = ''; $str=''; 				switch ( $errno ) {			case E_ERROR:			case E_USER_ERROR:				$type = 'Fatal Error';				$exit = true;				break;			case E_USER_WARNING:			case E_WARNING:				$type = 'Warning Error';				break;			case E_USER_NOTICE:			case E_NOTICE:			case @E_STRICT:				$type = 'Notice Error';				break;			case @E_RECOVERABLE_ERROR:				$type = 'Catchable Error';				break;			default:				$type = 'Unknown Error';				$exit = true;				break;		}		 errTemplate::LoadCss();	     include(dirname(__FILE__).'/show-error.php'); 	showErrorFile::load($error_file,$error_line); 		 		 $result = '<table width="1000" border="1" cellspacing="0" cellpadding="0">'.CRLF					.'<tr><td class="monofont h" colspan="4">&nbsp;'.$type.'</td></tr>'.CRLF					.'<tr><td class="monofont e">&nbsp;1</td><td class="monofont e">&nbsp;Err Message</td><td class="monofont v" colspan="2">&nbsp;'.$errMessage.'</td></tr>'.CRLF					.'<tr><td class="monofont e">&nbsp;2</td><td class="monofont e">&nbsp;File</td><td class="monofont v" colspan="2">&nbsp;'.$error_file.'</td></tr>'.CRLF					.'<tr><td class="monofont e">&nbsp;3</td><td class="monofont e">&nbsp;Line</td><td class="monofont v" colspan="2">&nbsp;'.$error_line.'</td></tr>'.CRLF					.self::$instance->TraceBack( new Exception() )					.self::$instance->phpInfoLink().'</table>'.CRLF;		customScreen::$buffer .=  $result;		showErrorFile::show();		return 1;	}	function exceptionHandler($exception) {    // these are our templates    $traceline = "#%s %s(%s): %s(%s)";    $msg = "PHP Fatal error:  Uncaught exception '%s' with message '%s' in %s:%s\nStack trace:\n%s\n  thrown in %s on line %s";    // alter your trace as you please, here    $trace = $exception->getTrace();    foreach ($trace as $key => $stackPoint) {        // I'm converting arguments to their type        // (prevents passwords from ever getting logged as anything other than 'string')       // $trace[$key]['args'] = array_map('gettype', $trace[$key]['args']);    }    // build your tracelines    $result = array();    foreach ($trace as $key => $stackPoint) {		if (!isset($stackPoint['args'])) {			$stackPoint['args'] = array();		}        $result[] = sprintf( '<tr><td>&nbsp;%s</td><td>&nbsp;func: %s</td><td>&nbsp;File: %s </td><td>&nbsp;Line: %s %s</td></tr>'.CRLF,            $key+3,            $stackPoint['function'],            $stackPoint['file'],            $stackPoint['line'],                        implode(', ', $stackPoint['args'])        );    }    // trace always ends with {main}    //$result[] = '#' . ++$key . ' {main}';    // write tracelines into main template    $msg = sprintf(        $msg,        get_class($exception),        $exception->getMessage(),        $exception->getFile(),        $exception->getLine(),        implode("\n", $result),        $exception->getFile(),        $exception->getLine()    );	 errTemplate::LoadCss();	include(dirname(__FILE__).'/show-error.php'); 	showErrorFile::load($exception->getFile(),$exception->getLine());		$msg = '<table width="1000" border="1" cellspacing="0" cellpadding="0">'.CRLF	          .'<tr><td class="monofont h" colspan="4">&nbsp;PHP Fatal error:  Uncaught exception</td></tr>'.CRLF             .sprintf('<tr><td class="monofont e" >&nbsp;%s</td><td class="monofont e" >&nbsp;Message:</td><td class="monofont v" colspan="2">&nbsp;%s </td></tr>'.CRLF,1,$exception->getMessage(),'')		      .sprintf('<tr><td class="monofont e" >&nbsp;%s</td><td class="monofont e" >&nbsp;File : </td><td class="monofont v" colspan="2">&nbsp;%s </td></tr>'.CRLF,2,$exception->getFile(),$exception->getLine(),'')             .sprintf('<tr><td class="monofont e" >&nbsp;%s</td><td class="monofont e" >&nbsp;Line : </td><td class="monofont v" colspan="2">&nbsp;%s </td></tr>'.CRLF,3,$exception->getLine(),'');			 //.implode("\n", $result)    $msg .= self::$instance->TraceBack( new Exception() ,null, $exception).CRLF           .self::$instance->phpInfoLink().'</table>'.CRLF;	customScreen::$buffer .= $msg;	showErrorFile::show();    // log or echo as you please    //error_log($msg);	}		static public function ShowCurrentSetting() {		errTemplate::LoadCss();         $_count = 0;		function _out($msg,$param,$appendix='') {			global $_count;			return sprintf('<tr><td class="monofont e">&nbsp;%d</td><td class="monofont e">%s</td><td class="monofont v" colspan="5" width=200> %s</td></tr>',++$_count,$msg,ini_get($param).$appendix).CRLF;		}		customScreen::$buffer .= '<table width="1000" border="1" cellspacing="0" cellpadding="0">'.CRLF;		customScreen::$buffer .= _out('Error Reporting','error_reporting');		customScreen::$buffer .= _out('display_errors','display_errors');		customScreen::$buffer .= _out('log_errors','log_errors');		customScreen::$buffer .= _out('track_errors','track_errors');		customScreen::$buffer .= _out('expose_php','expose_php');		customScreen::$buffer .= _out('max_execution_time','max_execution_time',' Sec');		customScreen::$buffer .= _out('memory_limit','memory_limit');		customScreen::$buffer .= _out('post_max_size','post_max_size');				customScreen::$buffer .= '</table>'.CRLF;		customScreen::show();	}		static public function CustomShutdown() {		//ob_end_clean();		$error      = error_get_last();		//check if it's a core/fatal error, otherwise it's a normal shutdown		if($error !== NULL && $error['type'] === E_ERROR) {          	self::$instance->ErrorHandler($error['type'], $error['message'].$error['message'],$error['file'],$error['line']);			echo 'ProgramShutDown';		}		exit;	}}//ob_start();CustomExceptions::register();//try {//throw new Exception("Err handler"); //die();//} catch (Exception $e) {//	echo "Haloo";//}//x;?>