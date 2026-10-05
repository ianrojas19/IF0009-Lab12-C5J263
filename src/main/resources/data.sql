-- Inserción de Charlas principales con fechas
INSERT INTO charla (titulo, expositor, nivel, email_contacto, fecha_inicio, fecha_fin)
VALUES ('Introduccion a la Inteligencia Artificial', 'Dra. Maria Rojas', 'Principiante', 'maria@ai.com', '2026-11-01', '2026-11-05');

INSERT INTO charla (titulo, expositor, nivel, email_contacto, fecha_inicio, fecha_fin)
VALUES ('Microservicios con Spring Cloud', 'Ing. Carlos Brenes', 'Avanzado', 'carlos@spring.io', '2026-12-01', '2026-12-03');

INSERT INTO charla (titulo, expositor, nivel, email_contacto, fecha_inicio, fecha_fin)
VALUES ('Angular 18: Señales y Standalone', 'Licda. Laura Gomez', 'Intermedio', 'laura@angular.dev', '2026-10-15', '2026-10-20');

-- Inserción de Etiquetas (Tags) en la tabla relacional generada por @ElementCollection
-- El charla_id corresponde al orden de inserción (1, 2, 3) al ser IDENTITY
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (1, 'IA');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (1, 'Machine Learning');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (2, 'Spring Boot');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (2, 'Backend');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (2, 'Nube');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (3, 'Angular');
INSERT INTO charla_etiquetas (charla_id, etiqueta) VALUES (3, 'Frontend');

-- Inserción de Asistentes para cumplir Lab 12
INSERT INTO asistente (nombre_completo, correo_electronico, edad, charla_id) VALUES ('Juan Perez', 'juan@example.com', 25, 1);
INSERT INTO asistente (nombre_completo, correo_electronico, edad, charla_id) VALUES ('Maria Lopez', 'maria@example.com', 30, 1);
INSERT INTO asistente (nombre_completo, correo_electronico, edad, charla_id) VALUES ('Carlos Sanchez', 'carlos@example.com', 22, 2);
INSERT INTO asistente (nombre_completo, correo_electronico, edad, charla_id) VALUES ('Ana Vargas', 'ana@example.com', 28, 2);
INSERT INTO asistente (nombre_completo, correo_electronico, edad, charla_id) VALUES ('Luis Torres', 'luis@example.com', 35, 3);