# Terminal 00 navigator
This is a little script I made in half an hour when I was trying to get to the center/deepest node of [Terminal 00](http://angusnicneven.com) without looking about it up online.

It finds all the `<a>` html links and recursively crawls the websites links in the same domain. It then prints all the unique URL paths found in a node tree.

Check [found_nodes.txt](found_nodes.txt) to see the output of the script ran at February 11, 2020. It didn't found all 301 nodes.

## Running
Navigate to the project and run it with `node .` or `node index.js`.

## Map
Before this script was made, I made a map for fun of the nodes I had found manually. It has some overlap with the script results:
![terminal00map](https://github.com/g-otn/terminal-00-navigator/assets/44736064/725dc319-719a-41d7-9f8b-d324b81722e0)
The map was made in 2019-07, so it's most definitely partially outdated.

## Acknowledgements
Thank you [aluisioalves123](https://github.com/aluisioalves123) for trying to find the deepest node with me, which motivated me to make this.
