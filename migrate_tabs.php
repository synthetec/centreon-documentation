<?php

// scan files which end with .md (scandir)

$files = ['./en/toto.md'];
foreach ($files as $file) {
    $content = file_get_contents($file);
    if (preg_match($content, regex, $matches)) {
        var_dump($matches);
        // replace content by new tabs format
        $content = str_replace($oldTabs, $newTabs, $content);
    }
    file_put_contents($file, $content);
}



