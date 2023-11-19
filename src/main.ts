import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    const config = new DocumentBuilder()
        .setTitle('API Sebo')
        .setDescription(
            'Documentação da API do Sebo. <br><br> Considerações: com exeções dos endpoints "/users/signup" e "users/login", a header request de autorização deverá ser especificada através de: Key = Authorization, Value: Bearer "insira_o_token_jwt_gerado_aqui". ')
        .setVersion('1.3')
        .addTag('sebo')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);

    await app.listen(3000);
}
bootstrap();
