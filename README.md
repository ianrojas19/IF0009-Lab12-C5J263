# TechConf - Expansión del Sistema (Laboratorio 12 & Práctica 11.b)

## Parte 2: Análisis y Depuración de Errores

### Descripción del Error
Durante la implementación de la relación bidireccional entre `Charla` (One-to-Many) y `Asistente` (Many-to-One), se generó un error de recursividad infinita al intentar consultar el endpoint GET `/api/charlas`.

Al serializar una `Charla`, Jackson intenta serializar su lista de `Asistentes`. Cada `Asistente` contiene una referencia a la `Charla` a la que pertenece. Jackson luego intenta serializar esa `Charla` de nuevo, lo cual lleva de vuelta a sus `Asistentes`, creando un bucle infinito que culmina en un `StackOverflowError` (Error HTTP 500).

La captura de pantalla de este error está guardada en `docs/error_recursion.png`.

### Solución
Para resolver este problema, se utilizó la directiva de Jackson `@JsonIgnoreProperties`.

En la clase `Charla`, sobre la lista de asistentes, se agregó lo siguiente:
```java
@OneToMany(mappedBy = "charla", cascade = CascadeType.ALL)
@JsonIgnoreProperties("charla")
private List<Asistente> asistentes = new ArrayList<>();
```

Esto le indica a Jackson que, al serializar la lista de `asistentes` de una charla, omita la propiedad `charla` dentro de cada asistente, rompiendo el ciclo y permitiendo que la respuesta JSON se genere correctamente sin recursividad.
