/****** Объект:  Table [dbo].[users]    Дата сценария: 09/06/2014 19:11:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[users](
	[usersID] [int] IDENTITY(1,1) NOT NULL,
	[cName] [varchar](81) NOT NULL CONSTRAINT [DF_Table_1_usersName]  DEFAULT (''),
	[cEmail] [varchar](101) NOT NULL CONSTRAINT [DF_Table_1_usersEmail]  DEFAULT (''),
	[ySalary] [money] NOT NULL CONSTRAINT [DF_users_ySalary]  DEFAULT ((10000)),
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[usersID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Идентификатор сотрудника' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'users', @level2type=N'COLUMN',@level2name=N'usersID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Имя сотрудника' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'users', @level2type=N'COLUMN',@level2name=N'cName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Емэйл сотрудника' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'users', @level2type=N'COLUMN',@level2name=N'cEmail'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Зарплата сотрудника' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'users', @level2type=N'COLUMN',@level2name=N'ySalary'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Сотрудники' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'users'
GO
-- =============================================
-- Author:		Grachoff
-- Create date: 06092014
-- Description:	Добавление строки в таблицу USERS
-- =============================================
CREATE PROCEDURE [dbo].[spUsersInsertBase]
	@nUsersID int output,
	@cUsername varchar(80),
	@cEmail varchar(100),
	@ySalary money
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[users]
           ([cName]
           ,[cEmail]
           ,[ySalary])
     VALUES
           (@cUsername
           ,@cEmail
           ,@ySalary)

	set @nUsersID = scope_identity()

END
GO
-- =============================================
-- Author:		Grachoff
-- Create date: 06092014
-- Description:	Обновление строки в таблице USERS
-- =============================================
CREATE PROCEDURE [dbo].[spUsersUpdateBase]
	@nUsersID int,
	@cUsername varchar(80),
	@cEmail varchar(100),
	@ySalary money
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE [dbo].[users]
		SET
           [cName] = @cUsername
           ,[cEmail] = @cEmail
           ,[ySalary] = @ySalary
	WHERE usersID = @nUsersID

END
GO
-- =============================================
-- Author:		Grachoff
-- Create date: 06092014
-- Description:	Удаление строки из таблицы USERS
-- =============================================
CREATE PROCEDURE [dbo].[spUsersDeleteBase]
	@nUsersID int
AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM [dbo].[users]
		WHERE usersID = @nUsersID

END
GO
-- =============================================
-- Author:		Grachoff
-- Create date: 06092014
-- Description:	Получение списка пользователей
-- =============================================
CREATE PROCEDURE [dbo].[spUsersGet] 
	@nUsersID int = 0
AS
BEGIN
	SET NOCOUNT ON;
SELECT [usersID]
      ,[cName]
      ,[cEmail]
      ,[ySalary]
  FROM [dbo].[users]
	WHERE @usersID <=0 or (@nUsersID > 0 and usersID = @nUsersID)
    
END
