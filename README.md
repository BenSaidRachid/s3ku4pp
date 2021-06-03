## Hello, s3ku4pp

## <a name='TOC'>🐼 Summary</a>

* [Rules](#rules)
* [Overview](#overview)
* [Story](#story)
* [Postlude](#postlude)
* [Groups](#groups)
* [Credits](#credits)

## <a name='overview'>🦊 Rules</a>

Hi, here are some rules to carry out this story oav;

* You **MUST** create a git repository named `s3ku4pp`
* You **MUST** create a file called `.author.json` with the 2 randomized person.

```sh
~/cross-pwgame ❯❯❯ cat -e .author.json
{
  "member1" : "Richard Stallman",
  "member2" : "Steeve Jobs"
}$
```

> Of course, you can talk about the subject with other developers, peer-learning is
> the key to be a better developer. Don't hesitate to ask questions or help people on slack.

> Don't forget, there is no useless question :-)

* You **MUST** return the project on Friday June, 11 at 16:00.

## <a name='overview'>🐱 Overview</a>

The project is about creation an API, you what it is but, this one will be fully secured, step by step !

## <a name='story'>🐨 Features</a>

You must create a REST API that allow us to CREATE, READ, UPDATE and DELETE a single resource. Choose the one you want.
For that you have to use any stack : Express, Rails, Django, etc. 

> It can be planets, burgers, pokemons... whatever you want !

Your API must be run by a docker-compose file ;)

> Of course every sensible values must be set in an .env file

# Create an HTTPS server

You must create certificates (\*.key and \*.cert) using `OpenSsl` and use them into your application server code.

# Create a reverse proxy

You can use `nginx` or `traefik` and this proxy must be between your server and your clients.

# Hello, JWT

Add the well-known json web token authentication to your routes.

# API token

JWT is pretty cool for you user, but if you want to give access to your API to others services like server or for automation, 
you must create an API key that will be passed into the headers to allow this service to consume your API.

You will have to add
- An API key to identify the application
- A secret key, shared between the application and the REST API, used to sign requests and authenticate the application.

# Rate Limiter

Well, let's add a way to limit API calls. For that use a Redis instance that will be allow any API to call your service 10 times/minutes.

# Next part coming soon

You will learn how to add tiers services to protect your API against attacks.

## <a name='groups'>😱 Groups</a>

- ASSAMOI	Josias / SANVOISIN	Antoine
- BENZAQUIN	Ugo / BADJI	Yassine / MESTRIE	Esteban
- GALISSAIRE	Maxime / BEN SAID	Rachid
- GRANDA Emilie / FACINOU	Fabian
- IDKOWIAK	Fabrice / LHOMEL	Alexandre
- MOREAU	Kevin / PEREIRA	Romain
- PEROUMAL	Arunravi / RILI	Yanis
- RENAULT	Steven / BOUMAAZ	Wafaa
- TEJOUTEU TENEKEU	Cabrel Yvan / PIRAUX	Alexis

## <a name='credits'>🐵 Credits</a>

Craft with :heart: in **Paris**.
