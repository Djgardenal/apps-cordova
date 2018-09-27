<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

$app = new \Slim\App;
/*$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});*/

//GET
$app->get('/exemplo', function (Request $request, Response $response) {
	require 'DAO/ExemploDAO.php';
	require 'Serializers/ExemploSerializer.php';
	require 'Model/ExemploModel.php';
	$exemploModel = new ExemploModel();
	$exemploSerializer = new ExemploSerializer();
	$exemploDAO = new ExemploDAO();

	$exemplos = $exemploSerializer->serializeList($exemploDAO->getAll(0, 10));

	return $response->withHeader('Access-Control-Allow-Origin', '*')->withJson(array('total_geral' => 35, 'exemplo' => $exemplos));
});

$app->get('/exemplo/{id}', function (Request $request, Response $response) {
	$id = $request->getAttribute('id');
	require 'DAO/ExemploDAO.php';
	require 'Serializers/ExemploSerializer.php';
	require 'Model/ExemploModel.php';
	$exemploModel = new ExemploModel();
	$exemploSerializer = new ExemploSerializer();
	$exemploDAO = new ExemploDAO();

	$exemplo = $exemploSerializer->serialize($exemploDAO->getById($id));

	return $response->withHeader('Access-Control-Allow-Origin', '*')->withJson(array('exemplo' => $exemplo));
});

$app->run();
