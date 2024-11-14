-- DropForeignKey
ALTER TABLE `historico` DROP FOREIGN KEY `Historico_id_prescricao_fkey`;

-- DropForeignKey
ALTER TABLE `prescricao` DROP FOREIGN KEY `Prescricao_id_remedio_fkey`;

-- DropForeignKey
ALTER TABLE `prescricao` DROP FOREIGN KEY `Prescricao_id_usuario_fkey`;

-- AddForeignKey
ALTER TABLE `Prescricao` ADD CONSTRAINT `Prescricao_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescricao` ADD CONSTRAINT `Prescricao_id_remedio_fkey` FOREIGN KEY (`id_remedio`) REFERENCES `Remedio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_id_prescricao_fkey` FOREIGN KEY (`id_prescricao`) REFERENCES `Prescricao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
