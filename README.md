scrape-all-the-things
=====================

Hackday Project: Basic site-scraper that sends the data down a WebSocket.

This is just one part of the hackday project.

This component is an extension for Google Chrome that scrapes data from allmusic.com's artist, band, and album pages, and sents a structured object over a WebSocket.

The second component was an instance of PushMePullYou which simply relayed the data to a PHP script.

The PHP script then normalised the data and inserted new records into Neo4J.
