<?php
$dir = 'myDir';

// create new directory with 744 permissions if it does not exist yet
// owner will be the user/group the PHP script is run under
if( !file_exists($dir) ) {
    umask(0);  // linux perms to 666
    mkdir ($dir, 0744);
}

file_put_contents ($dir.'/test.txt', 'Hello File');
?>