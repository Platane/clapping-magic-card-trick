Clapping magic card trick
====

An stunning magic card trick. Use the microphone to communicate to your computer the picked card.

[![real life demo](./screenshot/magic.gif)](./screenshot/magic.mp4)

[![wercker status](https://app.wercker.com/status/82a68d6dd44b716bd6392d5f482bad98/s/master "wercker status")](https://app.wercker.com/project/byKey/82a68d6dd44b716bd6392d5f482bad98)

[play](https://platane.github.io/clapping-magic-card-trick/latest/index.html)

[version history](https://platane.github.io/clapping-magic-card-trick)

# Usage

Present the screen to your audience.
Ask them to pick a card and to memorize it.

Place the card in deck mode by clicking anywhere on the screen.

Now ask someone to whisper in your ear what the card was.

Improvise a goofy dance to transmit the picked card as a sequence of clap. 👏👏

The card appears on screen without you interacting with the computer. 😮


# Sequence

The clap sequence consist in a start clap, followed by 4 checkpoints where you should clap or not clap.

```
starting clap 
    |
    v
   -x---------------------x---------------------x-------------------x-------------------x----->
                     color is ⚫         card is ♠️️️️ or ♦️️       value is peer           value > 2
    👏                    -> 👏                 -> 👏               -> 👏               -> 👏
                                        ( aka the symbol
                                          is pointy on top )

```

_example :_

The audience pick the 3 ♦️.


* The card is 🔴         ->  x
* The symbol is pointy   ->  👏
* The value is not peer  ->   x
* The value is > 2       ->  👏

The clap sequence is: ( 👏 to start )   ...x...👏...x...👏


> It's important that you determine and memorize the clap sequence before starting to clap so you can distract the audience with an elaborated dance.



# Training

## hint

It can be hard to guess the perfect timing, we will have to train. Notice that you have a small hint on the top left corner of the screen.

![hint](./screenshot/hint.png)

The hint looks like `=oo-....` which can be split in 3 parts:
```
    =           |         oo-             |       ....
audio level     |    current sequence     |   delay until next clap check
```

> The hint is meant to be discrete, so your audience does not suspect a thing.

## training mode


To practice this trick, you can enter "trainig mode" by clicking on the cards rather than on the green rug.

![hint](./screenshot/training.png)

In training mode, the interval between two clap checks is larger, and cards will align to show you when you have to clap or not.

> The card on the first row are the ones selected if you clap at the next check. The second row are the ones selected if you do not clap.

